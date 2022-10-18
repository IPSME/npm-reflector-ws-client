

function load(window, str_worker_path, options, callback_INITd)
{
	if (!!window.SharedWorker) 
	{
		const CXN= 0b1 << 0;	// connections
		
		let b_= 0;
		if (options.log !== undefined)
			b_= options.log;

		const sharedworker= new SharedWorker( str_worker_path ); // "./reflector-bc-ws-client.js"
		sharedworker.port.start();
		sharedworker.port.postMessage(options);

		sharedworker.port.onmessage = function (e) {
			// console.log(e.lastEventId);
			let json= e.data;
			if (json.sharedworker === 'INITd!') {
				if (b_&CXN) console.log('REFL: sharedworker.load: INITd!');
				callback_INITd();
			}
		};

		if (b_&CXN) console.log("new SharedWorker", sharedworker);
	}
}

//-------------------------------------------------------------------------------------------------

export { load };
