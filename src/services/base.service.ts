import type { PaginationParams, PaginationResponse } from "@/types/pagination";
import type { ApiResponse } from "@/types/response";
import type { AxiosInstance } from "axios"

export const createBaseService = <
    Entity = any, 
    ListItem = Entity,
    CreateDTO = Partial<Entity>, 
    UpdateDTO = Partial<Entity>,
>(
    instance: AxiosInstance, 
    basePath: string
) => {
    return {
        getPage: async (params: PaginationParams): Promise<PaginationResponse<ListItem>> => {
            const response = await instance.get<ApiResponse<PaginationResponse<ListItem>>>(basePath, { params });
            return response.data.result;
        },

        getAll: async (): Promise<ListItem[]> => {
            const response = await instance.get<ApiResponse<ListItem[]>>(basePath);
            return response.data.result;
        },

        getById: async (id: string): Promise<Entity> => {
            const response = await instance.get<ApiResponse<Entity>>(`${basePath}/${id}`);
            return response.data.result;
        },

        create: async (data: CreateDTO): Promise<Entity> => {
            const response = await instance.post<ApiResponse<Entity>>(basePath, data);
            return response.data.result;
        },

        update: async (id: string, data: UpdateDTO): Promise<Entity> => {
            const response = await instance.put<ApiResponse<Entity>>(`${basePath}/${id}`, data);
            return response.data.result;
        },

        delete: async (id: string): Promise<void> => {
            await instance.delete(`${basePath}/${id}`);
        }
    }
}