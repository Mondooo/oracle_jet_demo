/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtree', 'ojs/ojbutton', 'ojs/ojtoolbar'],
  function(oj, ko, $) {

    function TreeModel() {
      var self = this;

      self.getNodeData = function(node, fn) {
        if (node === -1) {
          fn(self.getInitialLazyJson()) ;       // initial base tree node
        }
        else {
          var uri = node.data('uri');
          if (!(uri === '/')) { // ensure uri is end of '/'
            uri += '/';
          }
          self.getLazyJson(uri, fn);
        }
      };

      self.getInitialLazyJson = function() {
        return  [{
                  'metadata': { 'uri':'/' },
                  'title': '/',
                  'children': []
                }];
      };

      self.getLazyJson = function(uri, fn) {
        $.ajax({
          type: 'POST',
          url: 'http://localhost:3000/api',
          data: { path: uri },
          success: function(data) {
            var transformedData = transformData(data);
            fn(transformedData);
          }
        });
      }

    }
    return new TreeModel();
});

// ~Tools
// Convert a jQuery list of html element nodes to string containing node id's.
function _arrayToStr(arr) {
   var s = '' ;
   $.each(arr, function(i, val)
      {
        if (i) {
          s += ', ' ;
        }
        s += $(arr[i]).attr('id') ;
      }) ;

   return s ;
};

function transformData(dataString) {
  dataArray = JSON.parse(dataString);
  if (!dataArray.length) {
    return [{
      'attr': {
        'style': 'display: none'
      }
    }];
  } else {
    var result = [];
    dataArray.forEach(function(data) {
      result.push({
        'metadata': {
          'uri': data.path
        },
        'title': data.name,
        'children': data.type === 'directory' ? [] : undefined
      });
    });
    return JSON.stringify(result);
  }
}

