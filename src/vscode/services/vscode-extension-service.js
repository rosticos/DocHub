import axios from 'axios';

export class VscodeExtensionService {
	baseUrl = '/';

	constructor({ client = axios } = {}) {
		this.client = client;
	}

	createEmptyProject() {
		// console.log(1);
	}

	createDefaultProject() {
		// console.log(2);
	}
}
