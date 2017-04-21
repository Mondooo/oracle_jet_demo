/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtree', 'ojs/ojbutton', 'ojs/ojchart', 'ojs/ojtoolbar'],
function(oj, ko, $) {

  function ChartModel() {
    var self = this;

    var areaGroups = ["Group A", "Group B", "Group C", "Group D"];
    
    function getValue() {
      return 10 + Math.round(Math.random() * 50);
    }

    function getSeriesItems() {
      var items = [];
      for (var i = areaGroups.length - 1; i >= 0; i--) {
        items.push(getValue());
      }
      return items;
    }
    /* chart data */
    var areaSeries = [{name : "Series 1", items : getSeriesItems()},
                      {name : "Series 2", items : getSeriesItems()},
                      {name : "Series 3", items : getSeriesItems()},
                      {name : "Series 4", items : getSeriesItems()}];
    
    self.areaSeriesValue = ko.observableArray(areaSeries);
    self.areaGroupsValue = ko.observableArray(areaGroups);
    self.stackValue = ko.observable('o');
    self.orientationValue = ko.observable('vertical'); // chart direction
    
    /* toggle buttons*/
    self.stackOptions = [
        {id: 'unstacked', label: 'unstacked', value: 'off', icon: 'oj-icon demo-area-vert'},
        {id: 'stacked', label: 'stacked', value: 'on', icon: 'oj-icon demo-area-stack'}
    ];
    self.orientationOptions = [
        {id: 'vertical', label: 'vertical', value: 'vertical', icon: 'oj-icon demo-area-vert'},
        {id: 'horizontal', label: 'horizontal', value: 'horizontal', icon: 'oj-icon demo-area-horiz'}
    ];

    function updateButtonClick() {

      // first, change the raw data
      for (var s = 0; s < areaSeries.length; s++) {
          for (var g = 0; g < areaSeries[s].items.length; g++) {
              if (Math.random() < 0.3)
                  areaSeries[s].items[g] = getValue();
          }
      }

      // second, change the observable value, it will notify the view to update
      self.areaSeriesValue(areaSeries);

      return true;
    }

    $(function() {
      $("#tree").on("ojoptionchange", function(e, ui) {
        console.log("abcd test");
         if (ui.value[0].className.indexOf('leaf') !== -1) { // do if element is leaf
           updateButtonClick();
         }
      });
    });
  }

  var chartModel = new ChartModel();

  return chartModel;

}); 

function  getJson(node, fn) {      // get local json
  var data = [
               { 
                 "title": "News",
                 "attr": {"id": "news"}
               },
               { 
                 "title": "Blogs",
                 "attr": {"id": "blogs"},
                 "children": [ { "title": "Today",
                                 "attr": {"id": "today"}
                               },
                               { "title": "Yesterday",
                                 "attr": {"id": "yesterday"}
                               },
                               { "title": "Archive",
                                 "attr": {"id": "archive"}
                               }
                             ]
               },
               {
                 "title": "Links", 
                 "attr": {"id": "links"},
                 "children": [ { "title": "Oracle",
                                 "attr": {"id": "oracle"}
                               },
                               { "title": "IBM",
                                 "attr": {"id": "ibm"}
                               },
                               { "title": "Microsoft",
                                 "attr": {"id": "ms"},
                                 "children": [ { "title": "USA",
                                                 "attr": {"id": "msusa"},
                                                 "children": [ { "title": "North",
                                                                 "attr": {"id": "msusanorth"}
                                                               },
                                                               { "title": "South",
                                                                 "attr": {"id": "msusasouth"}
                                                               },
                                                               { "title": "East",
                                                                 "attr": {"id": "msusaeast"}
                                                               },
                                                               { "title": "West",
                                                                 "attr": {"id": "msusawest"}
                                                               }
                                                             ]
                                               },
                                               { "title": "Europe",
                                                 "attr": {"id": "msuerope"}
                                               },
                                               { "title": "Asia",
                                                 "attr": {"id": "msasia"},
                                                 "children": [ { "title": "Japan",
                                                                 "attr": {"id": "asiajap"}
                                                               },
                                                               { "title": "China",
                                                                 "attr": {"id": "asiachina"}
                                                               },
                                                               { "title": "India",
                                                                 "attr": {"id": "asiaindia"}
                                                               }
                                                             ]
                                               }
                                             ]
                               }
                             ]
               }
            ];

   fn(data) ;  // pass to ojTree using supplied function
};

// Convert a jQuery list of html element nodes to string containing node id's.
function _arrayToStr(arr)
{
   var s = "" ;
   $.each(arr, function(i, val)
      {
        if (i) {
          s += ", " ;
        }
        s += $(arr[i]).attr("id") ;
      }) ;

   return s ;
};

