import axios from 'axios';

const API_URL = 'https://patagonia-backend-qf0h.onrender.com/jobs';

export interface WorkPayload {
  record_id: string;
  job: 'estandar' | 'plano';
  file_plane?: {
    uri: string;
    type?: string;
    name: string;
  } | null;
  price: number;
  comments?: string;
}

export async function createContainerWork(data: WorkPayload) {
  try {
    const formData = new FormData();

    formData.append('record_id', data.record_id);
    formData.append('job', data.job);
    formData.append('price', String(data.price));
    formData.append('comments', data.comments ?? '');

    if (data.file_plane) {
      formData.append('plane', {
        uri: data.file_plane.uri,
        type: data.file_plane.type,
        name: data.file_plane.name,
      } as any);
    }

    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error al crear el trabajo:', error.response?.data || error);
    throw error;
  }
}
