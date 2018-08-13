import 'particles.js';

export default function() {
  window.particlesJS.load = function(tag_id, path_config_json, callback){

    /* load json config */
    if (typeof path_config_json === 'object') {
      window.particlesJS(tag_id, path_config_json);
      if(callback) callback();
    }
    else {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', path_config_json);
      xhr.onreadystatechange = function (data) {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            var params = JSON.parse(data.currentTarget.response);
            window.particlesJS(tag_id, params);
            if(callback) callback();
          }else{
            console.log('Error pJS - XMLHttpRequest status: '+xhr.status);
            console.log('Error pJS - File config not found');
          }
        }
      };
      xhr.send();
    }

  };
}