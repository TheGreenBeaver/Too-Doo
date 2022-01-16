import axios from 'axios';
import { getOrigin } from './misc';
import { API_ROOT } from './constants';
import { getHeaders } from './auth';

class ApiService {
  constructor() {
    this.tokens = {};
    this.nextId = 1;
    this.instance = axios.create({ baseURL: `${getOrigin()}${API_ROOT}` });
  }

  getOptions(withAuth = true, cancelOnPathChange = false) {
    const controller = new AbortController();
    const options = { signal: controller.signal };
    this.tokens[this.nextId++] = { cancelOnPathChange, controller }
    if (withAuth) {
      options.headers = getHeaders();
    }

    return options;
  }

  cancelById(id) {
    this.tokens[id]?.controller.abort();
    delete this.tokens[id];
  }

  async signIn(data) {
    return this.instance
      .post('/auth/sign_in', data, this.getOptions(false))
      .then(r => r.data);
  }

  async signUp(data) {
    return this.instance
      .post('/users', data, this.getOptions(false))
      .then(r => r.data);
  }

  async getCurrentUserData() {
    return this.instance
      .get('/users/me', this.getOptions())
      .then(r => r.data);
  }

  async logOut() {
    return this.instance
      .post('/auth/log_out', null, this.getOptions());
  }

  async createToDo(data) {
    return this.instance
      .post('/to_dos', data, this.getOptions())
      .then(r => r.data);
  }

  async listToDos() {
    return this.instance
      .get('/to_dos', this.getOptions(true, true))
      .then(r => r.data);
  }

  async getToDo(id) {
    return this.instance
      .get(`/to_dos/${id}`, this.getOptions(true, true))
      .then(r => r.data);
  }

  async updateToDo(id, data) {
    return this.instance
      .patch(`/to_dos/${id}`, data, this.getOptions())
      .then(r => r.data);
  }

  async deleteToDo(id) {
    return this.instance
      .delete(`/to_dos/${id}`, this.getOptions());
  }
}

const apiService = new ApiService();
export default apiService;