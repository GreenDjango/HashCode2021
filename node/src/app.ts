import { execSync } from 'child_process'
import pathOS from 'path'
import fs from 'fs'
import ora from 'ora'
import minimist from 'minimist'
import { BEGIN_HADER, END_HADER } from './utils'

type intersectionID = number
type pairIntersectionID = string

// , A -> B -> C -> D

class Car {
    delay: number
    parcours: intersectionID[]
}

class Intersection {
    routes: Set<intersectionID>
    light?: intersectionID | undefined // index routes
    blocked: boolean
}

class IntersectionManager {
    intersections: Map<intersectionID, Intersection> = new Map()
    pairRoutes: Map<pairIntersectionID, number> = new Map()
    routePair: Map<string, pairIntersectionID> = new Map()
    cars: Car[] = []

    public add(id: intersectionID, dest: intersectionID, delay: number, route: string) {
        this.pairRoutes.set(`${id},${dest}`, delay)
        this.routePair.set(route, `${id},${dest}`)
        if (!this.intersections.get(id)) {
            this.intersections.set(id, { routes: new Set(), blocked: false })
        }
        this.intersections.get(id).routes.add(dest)
    }

    public insertCar(routes: string[]) {
        const parcours = []
        routes.forEach((r) => {
            const [, x2] = this.routePair
                .get(r)
                .split(',')
                .map((el) => Number(el))
            parcours.push(x2)
        })
        this.cars.push({ delay: 0, parcours })
    }

    public updateLight() {
        for (const [key, inter] of this.intersections) {
            let best_score = 0
            let best_choice = undefined
            for (const route of inter.routes) {
                let score = 0
                this.cars.forEach((c) => {
                    if (c.delay === 0 && c.parcours[0] === key && c.parcours[1] === route) score++
                })
                if (best_score < score) {
                    best_score = score
                    best_choice = route
                }
            }
            if (best_choice) {
                if (inter.light !== best_choice) {
                    inter.light = best_choice
                    console.log(key, best_choice)
                }
            }
        }

        const counter = new Map<pairIntersectionID, number>()
        // Pour chaque voiture
        for (const car of this.cars) {
            if (car.delay !== 0) continue
            const key = `${car.parcours[0]},${car.parcours[1]}`
            const val = counter.get(key)
            if (!val) counter.set(key, 1)
            else counter.set(key, val + 1)
        }
        // chaque
    }
}

function openFile(path: string) {
    const realPath = pathOS.resolve(process.cwd(), path)
    const file = fs.readFileSync(realPath, 'utf8')

    return file
}

// 1 - On gère les feux (passe au vert les routes avec le plus de voiture)
// 2 - On avance les voiture
//      si delay > 0 -> -1
//      else if delay == 0 && feu au vert -> delay = delay Destination, next = destination, routes.shift()

function parseFile(file: string, interManager: IntersectionManager) {
    const lines = file.split('\n')
    // 6 4 5 2 1000
    const fl = lines[0].split(' ').map((el) => Number(el))
    const info = { duration: fl[0], nbInter: fl[1], nbStreet: fl[2], nbCar: fl[3] }

    const interReg = /\d+ \d+/
    for (const line of lines) {
        if (!line || line === lines[0]) continue

        if (interReg.test(line)) {
            // 1 2 rue-de-moscou 3
            const lineArg = line.split(' ')
            interManager.add(Number(lineArg[0]), Number(lineArg[1]), Number(lineArg[3]), lineArg[2])
        } else {
            // 3 rue-d-athenes rue-de-moscou rue-de-londres
            const lineArg = line.split(' ')
            interManager.insertCar(lineArg.slice(1))
        }
    }

    return info
}

// 1 - On gère les feux (passe au vert les routes avec le plus de voiture)
// 2 - On avance les voiture
//      si delay > 0 -> -1
//      else if delay == 0 && feu au vert -> delay = delay Destination, next = destination, routes.shift()
export const run = async () => {
    const args = minimist(process.argv.slice(2))
    if (!args.f) throw Error('Need file path: -f file')

    const file = openFile(args.f)
    const interManager = new IntersectionManager()
    const info = parseFile(file, interManager)

    console.log(interManager.cars)
    let remainingRound = info.duration
    while (remainingRound) {
        remainingRound--
        // Update lights
        interManager.updateLight()
        // Move cars
        for (const car of interManager.cars) {
            if (car.delay) car.delay--
            else {
                const inter = interManager.intersections.get(car.parcours[0])
                if (inter.blocked) continue
                if (inter.light !== car.parcours[1]) continue
                car.delay = interManager.pairRoutes.get(`${car.parcours[0]},${car.parcours[1]}`)
                car.parcours.shift()
                inter.blocked = true
            }
        }
        // Reset intersections
        interManager.intersections.forEach((el) => (el.blocked = false))
    }
    interManager.cars.forEach((c) => console.log(c))
    console.log(interManager.cars)
    console.log(interManager)

    //console.log(interManager)

    // const spinner = ora().start('await ls...')
    // const res = execSync('sleep 2; ls -la' /*, { stdio: 'inherit' }*/).toString('utf-8')
    // spinner.stop()
    // console.log(res)
}
