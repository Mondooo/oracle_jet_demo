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
      
      /* toggle button variables */
      self.stackValue = ko.observable('off');
      self.orientationValue = ko.observable('vertical');
      
      /* chart data */
      var areaSeries = [{name : "Series 1", items : [74, 42, 70, 46]},
                        {name : "Series 2", items : [50, 58, 46, 54]},
                        {name : "Series 3", items : [34, 22, 30, 32]},
                        {name : "Series 4", items : [18,  6, 14, 22]}];
  
      var areaGroups = ["Group A", "Group B", "Group C", "Group D"];
 
      
      this.areaSeriesValue = ko.observableArray(areaSeries);
      this.areaGroupsValue = ko.observableArray(areaGroups);
      
      /* toggle buttons*/
      self.stackOptions = [
          {id: 'unstacked', label: 'unstacked', value: 'off', icon: 'oj-icon demo-area-vert'},
          {id: 'stacked', label: 'stacked', value: 'on', icon: 'oj-icon demo-area-stack'}
      ];
      self.orientationOptions = [
          {id: 'vertical', label: 'vertical', value: 'vertical', icon: 'oj-icon demo-area-vert'},
          {id: 'horizontal', label: 'horizontal', value: 'horizontal', icon: 'oj-icon demo-area-horiz'}
      ];
  }
  
  var chartModel = new ChartModel();
  $(
    function() {
      ko.applyBindings(chartModel, document.getElementById('chart-container'));
      $("#tree").on("ojoptionchange", function(e, ui) {
         if (ui.option == "selection") {
           // show selected nodes
           var selected = _arrayToStr(ui.value) ;
           $("#results").text("id = " + selected) ;
         }
      });
    }
  );
}); 

function  getJson(node, fn)       // get local json
  {
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

