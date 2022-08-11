# Directions For Use: #
![plot](./Images/editor.PNG)

## Adding Entities
To add an entity, make sure the slider at the top left of the webpage is set to **Add Entity**.  

Then, select the type of entity you would like to add using the **Type of entity** dropdown and hit the **Add to Scene** button.

### Types of Entities
- Circle
- Plane
- Triangle
- Gradient
- Checkerboard
- Grille

## Editing Entities
**In order to access the editor one or more entities must be added to the scene.**
Once entities have been added to the scene, change the slider to **Edit Entity.**

### Background Settings
#### Background color:  
To change the background color, select a new color or enter the hexadecimal code of the desired color.
### Entity Settings
#### Universal Settings
##### Position:  
The position of an entity refers to where its center point is located. The editor interfaces the three axis in different manners. 
Positional data is calculated based on a cylinder that encompasses the camera. The radius of this cylinder cannot be changed, however the cylinder has an infinite height. The x and z axes are responsible for horizontal positioning. The y axis controls the vertical position. 

   - x-axis: This axis is in terms of **degrees** where 1 degree references 1 degree of clockwise rotation away from the fixed camera center on the cylinder.
   - y-axis: This axis is in terms of **world units** where 1 world unit is equal to 1 meter in 3D space. 
   - z-axis: **The z-axis is NOT editable by users.** It is automatically calculated based on the x-axis angle.

