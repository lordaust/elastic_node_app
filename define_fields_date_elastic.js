PUT player
{
  "mappings": {
    "comment": {
      "properties": {
        "date": {
          "type": "date"
        }
      }
    }
  }
}


DELETE player



PUT player
{
    "settings" : {
        "number_of_shards" : 1
    },
    "mappings" : {
        "comment" : {
            "properties" : {
              "date": {
                "type": "date"
              }
            }
        }
    }
}
