/* Loads in prebuilt scenes and adds them to scenes json */

import red from './patterns/red.JSON' assert { type: "json" };
scenes['red'] = red['scenes']['default']

import green from './patterns/green.JSON' assert { type: "json" };
scenes['green'] = green['scenes']['default']

import blue from './patterns/blue.JSON' assert { type: "json" };
scenes['blue'] = blue['scenes']['default']

import white from './patterns/white.JSON' assert { type: "json" };
scenes['white'] = white['scenes']['default']

import grille from './patterns/grille.JSON' assert { type: "json" };
scenes['grille'] = grille['scenes']['default']

import line from './patterns/line.JSON' assert { type: "json" };
scenes['line'] = line['scenes']['line']

import checkerboard_w from './patterns/checkerboard (w).JSON' assert { type: "json" };
scenes['checkerboard (w)'] = checkerboard_w['scenes']['checkerboard (w)']

import checkerboard_b from './patterns/checkerboard (b).JSON' assert { type: "json" };
scenes['checkerboard (b)'] = checkerboard_b['scenes']['checkerboard (b)']

import dot_array from './patterns/dot array.JSON' assert { type: "json" };
scenes['dot array'] = checkerboard_w['scenes']['dot array']

import crosshair from './patterns/crosshair.JSON' assert { type: "json" };
scenes['crosshair'] = crosshair['scenes']['crosshair']
