export const BEGIN_HADER = `#ifndef MY_ARRAY_h__
#define MY_ARRAY_h__

#include <stdint.h>

typedef struct array_s array_t;
struct array_s
{
    uint32_t lib;
    uint16_t setup;
    uint16_t flow;
    uint16_t nb_book;
    uint16_t *books;
};
`

export const END_HADER = `#endif`

class Header {
    text = ''

    constructor() {
        this.text = BEGIN_HADER
    }

    addXXX() {
        1
    }

    toString() {
        return this.text + END_HADER
    }
}
