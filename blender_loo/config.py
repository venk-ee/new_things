########## init #############


import bpy

bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete()

bpy.ops.mesh.primitive_monkey_add(size=2, location=(0, 0, 1))
avatar=bpy.context.active_object
avatar.name="Base_Avatar"
bpy.ops.object.modifier_add(type='SUBSURF')
avatar.modifiers["Subdivision"].levels=2
bpy.ops.object.shade_smooth()

bpy.ops.mesh.primitive_cone_add(vertices=16,radius1=0.8,depth=0.1,location=(0,0,2.5))
hat = bpy.context.active_object
hat.name = "Accessory_Hat"
bpy.ops.object.shade_smooth()

hat.parent=avatar

blue_material=bpy.data.materials.new(name="Blue_Fabric")
blue_material.use_nodes=True
blue_material.node_tree.nodes["Principled BSDF"].inputs[0].default_value=(0.0,0.0,0.8,1.0)
hat.data.materials.append(blue_material)

export_path = bpy.path.abspath("/home/kenny/blenderrrr/my_generated_avatar.glb")

bpy.ops.export_scene.gltf(filepath=export_path, export_format='GLB')



######### how to import body #################

import bpy

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()

file_path="/home/kenny/pytorch/blenderrrr/X Bot (1).fbx"

bpy.ops.import_scene.fbx(filepath=file_path)

avatar=bpy.context.selected_objects[0]
avatar.name="Base_Human"

bpy.ops.mesh.primitive_cone_add(vertices=16, radius1=0.2, depth=0.5, location=(0, 0, 1.8))
hat = bpy.context.active_object
hat.name = "Accessory_Hat"
bpy.ops.object.shade_smooth()

hat.parent = avatar

blue_material = bpy.data.materials.new(name="Blue_Fabric")
blue_material.use_nodes = True
blue_material.node_tree.nodes["Principled BSDF"].inputs[0].default_value = (0.0, 0.0, 0.8, 1.0)
hat.data.materials.append(blue_material)

print("Human successfully imported and equipped!")





###### import a model and move its hand #######

import bpy
import math


if bpy.context.mode != 'OBJECT':
    bpy.ops.object.mode_set(mode='OBJECT')

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()


file_path="/home/kenny/pytorch/blenderrrr/X Bot (1).fbx"

bpy.ops.import_scene.fbx(filepath=file_path)

avatar=bpy.context.selected_objects[0]
avatar.name="Base_Human"

bpy.ops.mesh.primitive_cone_add(vertices=16, radius1=0.2, depth=0.5, location=(0, 0, 1.8))
hat = bpy.context.active_object
hat.name = "Accessory_Hat"
bpy.ops.object.shade_smooth()

hat.parent = avatar

blue_material = bpy.data.materials.new(name="Blue_Fabric")
blue_material.use_nodes = True
blue_material.node_tree.nodes["Principled BSDF"].inputs[0].default_value = (0.0, 0.0, 0.8, 1.0)
hat.data.materials.append(blue_material)

print("Human successfully imported")

skeleton = None
for obj in bpy.data.objects:
    if obj.type == 'ARMATURE':
        skeleton = obj
        break
    
if skeleton:
    
    bpy.context.view_layer.objects.active=skeleton
    bpy.ops.object.mode_set(mode='POSE')
    
    target_bone = None
    for bone in skeleton.pose.bones:
        if "LeftArm" in bone.name and "Fore" not in bone.name:
            target_bone = bone
            break 
        
    if target_bone:
        target_bone.rotation_mode = 'XYZ'
        
        target_bone.rotation_euler.z -= math.radians(60)
        print("Success! The arm has been moved.")
        

    else:
        print("Could not find the left arm bone. Mixamo might have named it differently.")
else:
    print("Could not find a skeleton in the scene!")



###import body an#######

