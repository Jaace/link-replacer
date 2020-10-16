document.addEventListener('DOMContentLoaded', function() {
  const saveButton = document.getElementById('saveChanges');
  const originalURL = document.getElementById('originalURL');
  const modifiedURL = document.getElementById('modifiedURL');

  if (localStorage.getItem('originalURL')) {
    originalURL.value = localStorage.originalURL;
  }

  if (localStorage.getItem('modifiedURL')) {
    modifiedURL.value = localStorage.modifiedURL;
  }

  saveButton.addEventListener('click', function() {
    localStorage.setItem('originalURL', originalURL.value);
    localStorage.setItem('modifiedURL', modifiedURL.value);

    function modifyDOM() {
      const anchors = document.getElementsByTagName('a');
      //You can play with your DOM here or check URL against your regex
      // console.log('Tab script:');
      // console.log(document.body);
      // console.log(anchors);
      for (var i = 0; i < anchors.length; i++) {
        // FOR DEBUGGING ONLY
        if (i == 20) {
          console.log(anchors[i].href);
          const url = new URL(anchors[i].href);
          console.log(url);
        }
        // anchors[i].href = `${anchors[i].href}?wc_test=wirecutter_anon_test`
      }
      return document.body.innerHTML;
    }

    chrome.tabs.executeScript({
      code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
      //Here we have just the innerHTML and not DOM structure
      console.log('Popup script:')
      console.log(results[0]);
  });


    // chrome.tabs.getSelected(null, function(tab) {
    //   const anchors = tab.getElementsByTagName('a');
    //   console.log(anchors);
    //   // alert(anchors);
    // });

    // chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    //   console.log('WTF');
    // });
    // For a setting of no variant
    // for (var i = 0; i < anchors.length; i++) {
    //     anchors[i].href = `${anchors[i].href}?wc_test=wirecutter_anon_test`
    // }

    // const originalURL = document.getElementById('originalURL').value;
    // const modifiedURL = document.getElementById('modifiedURL').value;
    // chrome.tabs.getSelected(null, function(tab) {
    //   alert(`ORIGINAL: ${originalURL} and MODIFIED: ${modifiedURL}`);
    // });
  }, false);
}, false);