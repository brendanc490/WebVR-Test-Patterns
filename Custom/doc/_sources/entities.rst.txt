Entities
===================

Universal Settings
-------------------

- Position
    The position of an entity refers to where its center point is located. Positional data is calculated based on a cylinder that encompasses the camera. The radius of this cylinder can be changed and the cylinder has an infinite height.

    .. image:: ../Images/cylinderRadius.PNG
        :width: 600

    - :math:`{\alpha}` (deg)
        - The horizontal position in the fov, calculated as an offset from the center point
        - 1 degree represents 1 degree of clockwise rotation away from the fixed camera center on the cylinder
        - Moving an entity horizontally will rotate it to face the camera
    - y (m)
        - The vertical position in the fov
        - This axis is in terms of **world units** where 1 world unit is equal to 1 meter in 3D space
    - z (m)
        - The distance from the camera
        - This axis is in terms of **world units** where 1 world unit is equal to 1 meter in 3D space

- Rotation (deg)
    The axis of rotation is located at the position coordinate of the entity and faces the camera

- Color
    The primary color of the entity

Advanced Universal Settings
---------------------------
Advanced mode offers more freedom with position and rotation than standard mode. Entities no longer move around a cylindrical plane, but instead move in 3D space.

- Position
    The position of an entity refers to where its center point is located. The location of the camera is noted as :math:`(0,0,0)`

    - x (m)
        - The horizontal position in the fov
        - This axis is in terms of **world units** where 1 world unit is equal to 1 meter in 3D space
        - Moving an entity horizontally will **no longer** rotate it to face the camera
    - y (m)
        - The vertical position in the fov
        - This axis is in terms of **world units** where 1 world unit is equal to 1 meter in 3D space
    - z (m)
        - The distance from the camera
        - This axis is in terms of **world units** where 1 world unit is equal to 1 meter in 3D space

- Rotation
    The axis of rotation is located at the position coordinate of the entity and faces the camera

    - x (deg)
        - rotation about the x axis
    - y (deg)
        - rotation about the y axis
    - z (deg)
        - rotation about the z axis


- Color
    The primary color of the entity


Entity Chart
-------------

+-----------------------------------+---------------------------------+--------------------------------------+--------------------------------+--------------------------------------+---------------------------------+
| **Entity Name**                   |  **Attribute 1**                |  **Attribute 2**                     | **Attribute 3**                | **Attribute 4**                      | **Attribute 5**                 |
+-----------------------------------+---------------------------------+--------------------------------------+--------------------------------+--------------------------------------+---------------------------------+
| .. _Circle:                       |                                 |                                      |                                |                                      |                                 |
|                                   |                                 |                                      |                                |                                      |                                 |
| Circle                            | Radius (m)                      | Border Size (m)                      | n/a                            | n/a                                  | n/a                             |
|                                   |  - Radius of the circle         |  - Amount of fill                    |                                |                                      |                                 |
|                                   |  - Default: 31.25 m             |  - Default: 31.25 m                  |                                |                                      |                                 |
+-----------------------------------+---------------------------------+--------------------------------------+--------------------------------+--------------------------------------+---------------------------------+
| .. _Plane:                        |                                 |                                      |                                |                                      |                                 |
|                                   |                                 |                                      |                                |                                      |                                 |
| Plane                             | Height (m)                      | Width (m)                            | Border Size (m)                | Textures                             | n/a                             |
|                                   |  - Height of the plane          |  - Width of the plane                |  - Amount of fill              |  - :ref:`Using Textures <TexLabel>`  |                                 |
|                                   |  - Default: 62.5 m              |  - Default: 31.25 m                  |  - Default: 31.25 m            |  - Default: none                     |                                 |
+-----------------------------------+---------------------------------+--------------------------------------+--------------------------------+--------------------------------------+---------------------------------+
| .. _Triangle:                     |                                 |                                      |                                |                                      |                                 |
|                                   |                                 |                                      |                                |                                      |                                 |
| Triangle                          | Vertex A (x (m),y (m))          | Vertex B (x (m),y (m))               | Vertex C (x (m),y (m))         |  n/a                                 | n/a                             |
|                                   |                                 |                                      |                                |                                      |                                 |
| .. image:: ../Images/triangle.PNG |  - Height of the plane          |  - Width of the plane                |  - Amount of fill              |                                      |                                 |
|    :width: 300                    |  - Default: (0, 23.438)         |  - Default: (-31.25, -31.25)         |  - Default: (31.25, -31.25)    |                                      |                                 |
|                                   |                                 |                                      |                                |                                      |                                 |
+-----------------------------------+---------------------------------+--------------------------------------+--------------------------------+--------------------------------------+---------------------------------+
| .. _Gradient:                     |                                 |                                      |                                |                                      |                                 |
|                                   |                                 |                                      |                                |                                      |                                 |
| Gradient                          | Bar Height (m)                  | Bar Width (m)                        | Number of Bars                 | Secondary Color                      | n/a                             |
|                                   |  - Height of each bar           |  - Width of each bar                 |  - Number of bars in gradient  |  - Color to fade into                |                                 | 
|                                   |  - Default: 18.75               |  - Default: 6.25                     |  - Default: 32                 |  - Default: Black (#000000)          |                                 |
+-----------------------------------+---------------------------------+--------------------------------------+--------------------------------+--------------------------------------+---------------------------------+
| .. _Checkerboard:                 |                                 |                                      |                                |                                      |                                 |
|                                   |                                 |                                      |                                |                                      |                                 |
| Checkerboard                      | Tile Size (m)                   | Number of Columns                    | Number of Rows                 | Secondary Color                      | n/a                             |
|                                   |  - Height/width each tile       |  - Number of columns in the board    |  - Number of rows in the board |  - Color of secondary tiles          |                                 | 
|                                   |  - Default: 5                   |  - Default: 16                       |  - Default: 17                 |  - Default: Black (#000000)          |                                 |
+-----------------------------------+---------------------------------+--------------------------------------+--------------------------------+--------------------------------------+---------------------------------+
| .. _Grille:                       |                                 |                                      |                                |                                      |                                 |
|                                   |                                 |                                      |                                |                                      |                                 |
| Grille                            | Bar Height (m)                  | Bar Width (m)                        | Number of Bars                 | Secondary Color                      | n/a                             |
|                                   |  - Height of each bar           |  - Width of each bar                 |  - Number of bars in grille    |  - Color of secondary bars           |                                 | 
|                                   |  - Default: 18.75               |  - Default: 6.25                     |  - Default: 32                 |  - Default: Black (#000000)          |                                 |
+-----------------------------------+---------------------------------+--------------------------------------+--------------------------------+--------------------------------------+---------------------------------+
| .. _DotArray:                     |                                 |                                      |                                |                                      |                                 |
|                                   |                                 |                                      |                                |                                      |                                 |
| Dot Array                         | Number of Columns               | Number of Rows                       | Radius of Dots (m)             | Spacing of Dots (m)                  | Toggle Center Dot               |
|                                   |  - Number of columns in array   |  - Number of rows in array           |  - Radius of each dot          |  - Space between dots                |  - Whether center dot is filled | 
|                                   |  - Default: 5                   |  - Default: 5                        |  - Default: 2                  |  - Default: 10                       |  - Default: No                  |
+-----------------------------------+---------------------------------+--------------------------------------+--------------------------------+--------------------------------------+---------------------------------+
| .. _CircularDotArray:             |                                 |                                      |                                |                                      |                                 |
|                                   |                                 |                                      |                                |                                      |                                 |
| Circular Dot Array                | Number of Dots                  | Number of Circles                    | Radius of Dots (m)             | Spacing of Dots (m)                  | Toggle Center Dot               |
|                                   |  - Number of dots in circles    |  - Number of circles in array        |  - Radius of each dot          |  - Space between dots                |  - Whether center dot is filled | 
|                                   |  - Default: 10                  |  - Default: 5                        |  - Default: 2                  |  - Default: 10                       |  - Default: No                  |
+-----------------------------------+---------------------------------+--------------------------------------+--------------------------------+--------------------------------------+---------------------------------+
| .. _Bullseye:                     |                                 |                                      |                                |                                      |                                 |
|                                   |                                 |                                      |                                |                                      |                                 |
| Bullseye                          | Number of Rings                 | Ring Pitch (m)                       | n/a                            | n/a                                  |  n/a                            |
|                                   |  - Number of rings in bullseye  |  - Pitch of rings in bullseye        |                                |                                      |                                 | 
|                                   |  - Default: 5                   |  - Default: 5                        |                                |                                      |                                 |
+-----------------------------------+---------------------------------+--------------------------------------+--------------------------------+--------------------------------------+---------------------------------+


Circle
-------
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| **Attribute**                     |  **Description**                                  |  **Default Value**                   |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Radius (m)                        | Radius of the circle                              | 31.25 m                              |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Border Size (m)                   | Amount of fill                                    | 31.25 m                              |
+-----------------------------------+---------------------------------------------------+--------------------------------------+



Plane
----------
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| **Attribute**                     |  **Description**                                  |  **Default Value**                   |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Height (m)                        | Height of the plane                               | 62.5 m                               |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Width (m)                         | Width of the plane                                | 31.25 m                              |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Border Size (m)                   | Amount of fill                                    | 31.25 m                              |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Textures                          | :ref:`Add a texture to the plane <TexLabel>`      | 62.5 m                               |
+-----------------------------------+---------------------------------------------------+--------------------------------------+

Triangle
----------

.. image:: ../Images/triangle.PNG
    :width: 300

+-----------------------------------+---------------------------------------------------+--------------------------------------+
| **Attribute**                     |  **Description**                                  |  **Default Value**                   |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Vertex A (x (m), y (m))           | Position of Vertex A                              | (0, 23.438)                          |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Vertex B (x (m), y (m))           | Position of Vertex B                              | (-31.25, -31.25)                     |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Vertex C (x (m), y (m))           | Position of Vertex C                              | (31.25,-31.25)                       |
+-----------------------------------+---------------------------------------------------+--------------------------------------+


Gradient
-------------
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| **Attribute**                     |  **Description**                                  |  **Default Value**                   |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Bar Height (m)                    | Height of each bar                                | 18.75 m                              |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Bar Width (m)                     | Width of each bar                                 | 6.25 m                               |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Number of Bars                    | Number of bars in the gradient                    | 32                                   |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Secondary Color (#HEXCODE)        | Color that the gradient fades to                  |  Black (#000000)                     |
+-----------------------------------+---------------------------------------------------+--------------------------------------+


Checkerboard
-------------
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| **Attribute**                     |  **Description**                                  |  **Default Value**                   |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Tile Size (m)                     | Height/width of each bar                          | 5 m                                  |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Number of Columns                 | Number of columns                                 | 16                                   |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Number of Rows                    | Number of rows                                    | 17                                   |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Secondary Color (#HEXCODE)        | Color of every other tile                         |  Black (#000000)                     |
+-----------------------------------+---------------------------------------------------+--------------------------------------+

Grille
--------------
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| **Attribute**                     |  **Description**                                  |  **Default Value**                   |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Bar Height (m)                    | Height of each bar                                | 18.75 m                              |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Bar Width (m)                     | Width of each bar                                 | 6.25 m                               |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Number of Bars                    | Number of bars in the grille                      | 32                                   |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Secondary Color (#HEXCODE)        | Color of every other bar                          |  Black (#000000)                     |
+-----------------------------------+---------------------------------------------------+--------------------------------------+

Dot Array
--------------
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| **Attribute**                     |  **Description**                                  |  **Default Value**                   |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Number of Columns                 | Number of columns in the array                    | 5                                    |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Number of Rows                    | Number of rows in the array                       | 5                                    |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Radius of Dots (m)                | Radius of each dot                                | 2 m                                  |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Toggle Center Dot                 | Whether center dot is filled or hollow            |  Hollow                              |
+-----------------------------------+---------------------------------------------------+--------------------------------------+

Circular Dot Array
-------------------
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| **Attribute**                     |  **Description**                                  |  **Default Value**                   |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Number of Dots                    | Number of dots in each circle                     | 10                                   |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Number of Rings                   | Number of rings in the array                      | 5                                    |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Radius of Dots (m)                | Radius of each dot                                | 2 m                                  |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Sapcing of Rings (m)              | Spacing between each ring in the array            | 10 m                                 |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Toggle Center Dot                 | Whether center dot is filled or hollow            |  Hollow                              |
+-----------------------------------+---------------------------------------------------+--------------------------------------+

Bullseye
-------------------
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| **Attribute**                     |  **Description**                                  |  **Default Value**                   |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Number of Rings                   | Number of rings in the bullseye                   | 5                                    |
+-----------------------------------+---------------------------------------------------+--------------------------------------+
| Ring Pitch (m)                    | Pitch of rings in the bullseye                    | 5 m                                  |
+-----------------------------------+---------------------------------------------------+--------------------------------------+

.. _TexLabel:

Using Textures
---------------
- There are some textures built into the site. `They can be found here. <https://github.com/DIDSR/WebXR-tools/tree/main/Custom/textures>`_ 
- Textures can also be uploaded as JPGs, PNGs or TIFFs and added to the list of available textures. 
- Applying a texture will automatically scale the plane to fit the aspect ratio.


