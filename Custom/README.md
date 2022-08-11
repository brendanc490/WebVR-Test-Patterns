# Directions For Use: #
![plot](../Images/editor.PNG)

## Adding Entities
To add an entity, make sure the slider at the top left of the webpage is set to ***Add Entity***.  

Then, select the type of entity you would like to add using the ***Type of entity*** dropdown and hit the ***Add to Scene*** button.

Entities will spawn at a random position within the editor camera field of view with a random color.

### Types of Entities
- Circle
- Plane
- Triangle
- Gradient
- Checkerboard
- Grille

## Editing Entities
**In order to access the editor one or more entities must be added to the scene**.
Once entities have been added to the scene, change the slider to ***Edit Entity***.

To change the entity being edited, either click on the entity or select the desired entity from the dropdown labeled ***Current Entity***.
Entity ID's are automatically generated with the format **\<name of entity\>\<number of entities of this type previously created\>**.  

Examples: circle0, checkerboard4, plane20

## Background Color
To change the background color, select a new color or enter the hexadecimal code of the desired color.

### Universal Entity Settings
#### Position: (x deg, y world units)
To edit the position, locate the position text boxes under **Universal Entity Settings**. The left box refers to the x position and the y position.  

The position of an entity refers to where its center point is located. The editor interfaces the three axis in different manners. 
Positional data is calculated based on a cylinder that encompasses the camera. The radius of this cylinder cannot be changed, however the cylinder has an infinite height. The x and z axes are responsible for horizontal positioning. The y axis controls the vertical position. 

![plot](../Images/cylinderRadius.PNG)

- x-axis: 
   - This axis is in terms of **degrees** where 1 degree references 1 degree of clockwise rotation away from the fixed camera center on the cylinder.
- y-axis: 
   - This axis is in terms of **world units** where 1 world unit is equal to 1 meter in 3D space. 
- z-axis: 
   - **The z-axis is NOT editable by users.** The location on the z-axis is automatically calculated based on the x-axis angle.

The reason that the radius of the cylinder is not editable is due to the fact that all entities are 2-dimensional. Changing their depth would essentially have the same effect as making entities smaller or larger.

#### Rotation: θ deg
To edit the rotation, locate the text box labeled ***Rotation*** under **Universal Entity Settings**.

For this program, the rotation of an entity refers to rotation around the **z-axis only**. The axis of rotation is located at the center point of entity. The unit for rotation is **degrees** where 1 degree refers to one degree of rotation about the axis of rotation.

#### Color: #HEXCODE
To edit the color, locate the color selector labeled ***Color*** under **Universal Entity Settings**.

Select a color using the color slider or input the desired color in hexadecimal format.

### Entity Specific Settings
#### Circle 
- Radius (m): 
   - The unit for radius is world meters where 1 world unit is equal to 1 meter in 3D space.
- Border Size: 
   - The unit for border size is world meters where 1 world unit is equal to 1 meter in 3D space. By default, the border size is set to be equal to the radius of the circle, meaning the entity is entirely filled in.

#### Plane
- Texture: 
   - There are some textures built into the site. [They can be found here.](https://github.com/brendanc490/WebVR-Test-Patterns/tree/main/Custom/patterns) Textures can also be uploaded as JPGS or PNGS and added to the list of available textures in the scene. 
   - Applying a texture will automatically scale the plane to fit the aspect ratio.
- Width (m): 
   - The unit for width is world meters where 1 world unit is equal to 1 meter in 3D space.
- Height (m): 
   - The unit for height is world meters where 1 world unit is equal to 1 meter in 3D space.
- Border Size: 
   - The unit for border size is world meters where 1 world unit is equal to 1 meter in 3D space. By default, the border size is set to be equal to the radius to the smallest dimension present of the plane, meaning the entity is entirely filled in.
