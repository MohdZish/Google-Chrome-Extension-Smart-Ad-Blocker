
//----------------RUN WHEN POPUP IS OPENED 

if (document.title == "SmartBlock") {

	// Find Tab URL and change texts
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		    var domainurl = tabs[0].url;

		    domain = (new URL(domainurl));
		    domain = domain.hostname;
		    document.getElementById('domaintext').innerHTML = domain;
		 	
		});


	// Necessary function for adding URL !

	function urladd(newarray){
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		    var domainurl = tabs[0].url;

		    domain = (new URL(domainurl));
		    domain = domain.hostname;


		    notexist = true;
		    for(i=0; i< newarray.length; ++i){
		   		if(newarray[i].slice(6,-2) == domain){
		   			 notexist = false;
		   		}
			}

			if(notexist ){
				newarray.push("*://*." + domain + "/*");
				chrome.storage.sync.set({'storedArray': newarray});
			}
		  	
		});
	}

	// URL Remove from enabled list
	function urlremove(newarray){
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		    var domainurl = tabs[0].url;

		    domain = (new URL(domainurl));
		    domain = domain.hostname;

		   	for(i=0; i< newarray.length; ++i){
		   		if(newarray[i].slice(6,-2) == domain){
		   			 newarray.splice(i, 1);
		   		}
			}

		  	chrome.storage.sync.set({'storedArray': newarray});
		});
	}


	// Function for switching blocked or enabled state
	function switchstate() {
		var check = document.getElementById('blockstatetxt').innerHTML;
		var result = "";

	  	if (check === 'Ads are blocked in this site') {
	    	result = 'Ads are enabled in this site';
	    	refreshsection.style.display = "block";

	    	chrome.storage.sync.get(['storedArray'], function(result) {
			  	newarray = result.storedArray;
			  	urladd(newarray);
			});
	  	} 

	  	else  {
			result = 'Ads are blocked in this site';
			refreshsection.style.display = "block";

			chrome.storage.sync.get(['storedArray'], function(result) {
			  	newarray = result.storedArray;
			  	urlremove(newarray);
			});

	  	}

	  	document.getElementById('blockstatetxt').innerHTML = result;

	}
	document.getElementById('internalswitch').addEventListener('click', switchstate);



	// Switch button according to enabled or not
	function correctswitch(){
		chrome.storage.sync.get(['storedArray'], function(result) {
			  	newarray = result.storedArray;

			  	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
				    var domainurl = tabs[0].url;

				    domain = (new URL(domainurl));
				    domain = domain.hostname;


				    notexist = true;
				    for(i=0; i< newarray.length; ++i){
				   		if(newarray[i].slice(6,-2) == domain){
				   			 notexist = false;
				   		}
					}

					if(notexist == false){
						document.getElementById('switch').click();
					}
				  	
				});
			});
	}

	correctswitch();

	//Create the Enabled Tab items
	function fillenabled(){
		var ul = document.querySelector("ul");
		ul .innerHTML = '';
		var temp = '';

		chrome.storage.sync.get(['storedArray'], function(result) {
				finallist = result.storedArray;
		  		for(i=0; i< finallist.length; ++i){
					temp = finallist[i];
			    	var li = document.createElement("li");
		  			li.appendChild(document.createTextNode(temp.slice(6,-1)));
		  			li.classList.add("list-group-item");
		  			ul.appendChild(li);
				}
		});	
	};

	//Navigation method between navigation:
	function showenable() {
		var enabledmenu = document.getElementById('enabledsection');
		var mainmenu = document.getElementById('mainsection');

		enabledmenu.style.display = "block";
		mainmenu.style.display = "none";

		fillenabled();


		document.getElementById('mainmenubtn').classList.add("inactivebtn");
		document.getElementById('enablemenubtn').classList.remove("inactivebtn");
		
	}

	function showmain() {
		var enabledmenu = document.getElementById('enabledsection');
		var mainmenu = document.getElementById('mainsection');

		enabledmenu.style.display = "none";
		mainmenu.style.display = "block";

		document.getElementById('mainmenubtn').classList.remove("inactivebtn");
		document.getElementById('enablemenubtn').classList.add("inactivebtn");
	}

	document.getElementById('enablemenubtn').addEventListener('click', showenable);

	document.getElementById('mainmenubtn').addEventListener('click', showmain);

	//  Navigation Default Behavior
	var enabledmenu = document.getElementById('enabledsection');
	enabledmenu.style.display = "none"; // HIDDEN by default
	refreshsection.style.display = "none";


	//  Refresh Page
	document.getElementById("refreshbtn").onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    	});
	};


	//  Clear enabled list 
	document.getElementById('clearenabledbtn').onclick = function(){
		chrome.storage.sync.get(['storedArray'], function(result) {
			newarray = result.storedArray;

			newarray.length = 0;
			chrome.storage.sync.set({'storedArray': newarray}, function() {
			   showenable();
			});
		});	
	}


	chrome.storage.sync.get(['totaladscounter'], function(result) {
  	if(document.title == "SmartBlock"){
			document.getElementById('totalblockedtxt').innerHTML = result.totaladscounter;
		}
	});

}