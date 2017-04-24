/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtree', 'ojs/ojbutton', 'ojs/ojchart', 'ojs/ojtoolbar', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojcollectiontabledatasource'],
function(oj, ko, $) {

  function TreeModel() {
    var self = this;

    self.LeafsDef = oj.Collection.extend({
      url: "http://localhost:3000/api",
    });

    self.fetchLeafs = function() {
      var leafs = new self.LeafsDef;
      leafs.fetch({
        success: function(collection, response, options) {
          console.log(response);
        },
        error: function(collection, xhr, options) {
          console.log("error occurs.");
        }
      });
      return true;
    }
  }

  $(function() {
    $("#tree").on("ojoptionchange", function(e, ui) {
       if (ui.value[0].className.indexOf('leaf') !== -1) { // do if element is leaf
         console.log('click test.');
       }
    });
  });

  return new TreeModel();
});

function getNodeData(node, fn) {
    if (node === -1) {
      fn(getInitialLazyJson()) ;       // initial json with no children
    }
    else {
      var uri = node.attr("uri");
      // ensure uri is end of '/'
      if (!(uri === "/")) {
        uri += "/";
      }
      console.log(uri);
      getLazyJson(fn, uri);
    }
};

function getLazyJson(fn, uri) {
  var leafs;
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/api",
    data: {path: uri},
    success : function(data) {
      
      console.log(data);
      // if you want to return a data userd by a callback, you must directly invoke the callback function
      fn(data);
    }
  });
  return leafs;
}

function getInitialLazyJson() {
  return  [{
            "attr": {
              "uri":"/"
            },
            "title": "/",
            "children": []
           }];
};

// Convert a jQuery list of html element nodes to string containing node id's.
function _arrayToStr(arr) {
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

