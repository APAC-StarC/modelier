Overview
=========
A json configuration gets generated from the django app, which includes all initialization settings 
for the viewer and each individual pointcloud model to be loaded.

An accompanying JS script is referenced on the default-generated potree HTML page, which accepts this 
json config, and initializes the viewer with the referenced models and settings.

Example configuration
--------------------- 

This is an example of the config that the django app generates dynamically and injects as a JSON literal
in the served HTML file. This configuration could also be exported, and loaded manually on a custom
made Potree visualization, outside of the django workflow.


```json
{
  "viewer": {
      "clipTask": 0, //0-None, 1-Highlight, 2-Show Inside, 3-Show outside
  },
  "scene": {
    "annotations": [
      {
        "title": "Annotation title",
        "description": "Annotation text", //Optional
        "position": [x,y,z],
        "cameraPosition": [x,y,z], //Optional if we want camera to move upon click
        "cameraTarget": [x,y,z], //Optional if we want camera to look somewhere specific upon click
        "annotations": [...] //Allows hierarchical annotations.
      },
      {
        "title": "Annotation 2 title",
        "description": "Annotation 2 text",
      }
    ]
  },
  "pointclouds":[
        {
            "url":"",
            "title":"",
            "material": {
                "size": 1,
                "pointSizeType": 0, //0-FIXED | 1-ATTENUATED | 2-ADAPTIVE"
                "activeAttributeName":"rgba|elevation",
                
            }
        }
    ]
}
```