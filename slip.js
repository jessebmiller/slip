goog.provide('DUVET');

goog.require('goog.net.Jsonp');
goog.require('goog.Uri');
goog.require('goog.string.format');

/**
 * @constructor
 * @param {string|goog.Uri} url Couch url. 
 **/
DUVET = function (url) {
    /**
     * /db/_view/myview?descending=true&limit=11&startkey=last&skip=1";
     * /db/_view/myview?descending=false&limit=11&startkey=first&skip=1";
     **/
    
    /**
     * @constructor
     * @param {string} db The name of the database to set.
     * @param {string} ddoc The name of the design doc to set 
     *                      (_design/{string ddoc})
     * @param {string} view The name of the view to set
     * @returns {View}
     **/
    return {
	View: function (db, ddoc, view) {
	    var viewUrl = new goog.Uri(url);
	    var pathTmpl = '%s/_design/%s/_view/%s';
	    var jsonp = {};
	    
	    viewUrl.setPath(goog.string.format(pathTmpl, db, ddoc, view));
	    
	    jsonp = new goog.net.Jsonp(viewUrl);
	    
	    return { 	
		/**
		 * @param {Function} callback A function to call with the requested data
		 * @returns {Object}
		 **/
		get: function (contentCallback) {
		    jsonp.send(null, contentCallback);
		    return this;
		}
	    };
        }
    };
};
