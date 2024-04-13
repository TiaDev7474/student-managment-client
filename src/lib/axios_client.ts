import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class HttpClient {
    private client(): AxiosInstance {
        const axiosConfig: AxiosRequestConfig = {
            baseURL: "http://localhost:8000/api"
        }
        let axiosInstance = axios.create(axiosConfig);
        const getAccessToken = () => {
            return document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='))?.replace("token=","");
        };
        axiosInstance.interceptors.request.use((config) => {
            const accessToken = getAccessToken();
            console.log()
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        return axiosInstance;
    }

    public get(url: string) {
        return this.client().get(url);
    }

    public post<T>(url: string, payload: T): Promise<AxiosResponse> {
        return this.client().post(url, payload);
    }

    public put<T>(url: string, payload: T): Promise<AxiosResponse> {
        return this.client().put(url, payload);
    }

    public patch<T>(url: string, payload: T): Promise<AxiosResponse> {
        return this.client().patch(url, payload);
    }

    public delete(url: string): Promise<AxiosResponse> {
        return this.client().delete(url);
    }
}

export const httpClient = new HttpClient();

