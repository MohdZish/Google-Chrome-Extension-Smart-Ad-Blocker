//Add initial storage variable !
chrome.storage.sync.set({'storedArray': allowedsites});


//Store initial value for TOTAL ADS
blockedads = 0;
chrome.storage.sync.set({'totaladscounter': blockedads});