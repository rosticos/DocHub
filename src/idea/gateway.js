
const listeners = {};

if ((process.env.VUE_APP_DOCHUB_MODE === 'plugin') && (process.env.NODE_ENV === 'production')) {
	setInterval(() => {
		window.$PAPI.messagePull().then((message) => {
			if (message) {
				for (const action in message.data) {
					(listeners[action] || []).forEach((listener) => {
						listener(message.data[action]);
					});
				}
			}
		});
	}, 300);
}

if (process.env.VUE_APP_DOCHUB_MODE === 'vs-plugin') {
	window.addEventListener('message', (event) => {
		const { command, content } = event?.data;

		if (command === 'update-source-file') {
			for (const action in content) {
				(listeners[action] || []).forEach((listener) => {
					listener(content[action]);
				});
			}
		}

		if (command === 'navigate') {
			for (const action in content) {
				(listeners[action] || []).forEach((listener) => {
					listener(content[action]);
				});
			}
		}
	});
}

export default {
	appendListener(action, listener) {
		const arr = listeners[action] = (listeners[action] || []);
		arr.push(listener);
	},
	removeListener(action, listener) {
		const arr = listeners[action] = (listeners[action] || []);
		const index = arr.indexOf(listener);
		if (index >=0 ) arr.splice(index, 1);
	}
};
