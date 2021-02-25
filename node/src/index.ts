#!/usr/bin/env node

import { run } from './app'

run().catch(err => {
	console.error(err)
})