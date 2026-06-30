import bpy, os

def u_col(s, c):
    if m := bpy.data.materials.get(c.scene.a_col):
        for n in ["Face_Hair_", "Face_Scalp"]:
            if (o := bpy.data.objects.get(n)) and o.data.materials: o.data.materials[0] = m

def u_skin(s, c):
    if m := bpy.data.materials.get(c.scene.a_skin):
        if (o := bpy.data.objects.get("Face_Body")) and o.data.materials:
            for i in range(min(3, len(o.data.materials))): o.data.materials[i] = m

class AVATAR_OT_gen(bpy.types.Operator):
    bl_idname, bl_label = "avatar.gen", "Load Scene"
    def execute(self, c):
        # 1. Colors
        mats = {"S1":(1,.8,.6,1), "S2":(.6,.4,.3,1), "S3":(.3,.15,.1,1), "C1":(.05,.05,.05,1), "C2":(.8,.7,.3,1), "C3":(.4,.2,.1,1)}
        for n, cl in mats.items():
            if n not in bpy.data.materials:
                m = bpy.data.materials.new(n); m.use_nodes = True
            m = bpy.data.materials[n]
            m.diffuse_color = cl
            if b := m.node_tree.nodes.get("Principled BSDF"): b.inputs[0].default_value = cl
        
        # 2. Clear default blocking objects like Cube
        for r in ["Cube"]:
            if r in bpy.data.objects: bpy.data.objects.remove(bpy.data.objects[r])
            
        def mk(n, op, **k):
            if n in bpy.data.objects: bpy.data.objects.remove(bpy.data.objects[n])
            op(**k); c.active_object.name = n; return c.active_object
        
        # 3. Load FBX
        fbx = r"C:\Users\loll\Desktop\dev\blender_loo\fbx_file\fbx_file.Fbx"
        if os.path.exists(fbx):
            for o in list(bpy.data.objects):
                if o.name.startswith("Face"): bpy.data.objects.remove(o)
            bpy.ops.import_scene.fbx(filepath=fbx)
            for o in c.selected_objects:
                if o.type == 'MESH': o.name = "Face_" + o.name
        else:
            f = mk("Face_Monkey", bpy.ops.mesh.primitive_monkey_add, radius=1.0)
            
        # 4. Apply initial colors
        u_col(None, c); u_skin(None, c)
        return {'FINISHED'}

class AVATAR_OT_snap(bpy.types.Operator):
    bl_idname, bl_label = "avatar.snap", "Screenshot"
    def execute(self, c):
        dir_path = os.path.dirname(bpy.data.filepath) if bpy.data.filepath else r"C:\Users\loll\Desktop\dev\blender_loo"
        c.scene.render.filepath = os.path.join(dir_path, "Snap.png")
        bpy.ops.render.opengl(write_still=True, view_context=True)
        return {'FINISHED'}

class VIEW3D_PT_avatar(bpy.types.Panel):
    bl_space_type, bl_region_type, bl_category, bl_label = 'VIEW_3D', 'UI', 'Avatar', "Avatar"
    def draw(self, c):
        l, s = self.layout, c.scene
        l.operator("avatar.gen", text="1. Load FBX & Set up")
        for p, n in [("a_skin","Skin Tone"), ("a_col","Hair Color")]: l.prop(s, p, text=n)
        l.operator("avatar.snap", text="2. Export Image")

cls = (AVATAR_OT_gen, AVATAR_OT_snap, VIEW3D_PT_avatar)
def register():
    for x in cls: bpy.utils.register_class(x)
    bpy.types.Scene.a_col = bpy.props.EnumProperty(items=[("C1","Black",""),("C2","Blonde",""),("C3","Brown","")], update=u_col)
    bpy.types.Scene.a_skin = bpy.props.EnumProperty(items=[("S1","Light",""),("S2","Med",""),("S3","Dark","")], update=u_skin)

def unregister():
    for x in reversed(cls): 
        try: bpy.utils.unregister_class(x)
        except: pass
    try: del bpy.types.Scene.a_col; del bpy.types.Scene.a_skin
    except: pass


unregister()
register()
