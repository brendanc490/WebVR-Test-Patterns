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