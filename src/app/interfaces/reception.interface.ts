export interface Reception {
  id: number;
  patientName: string;
  date: string;
  complaints: string;
  doctorId: number;
  doctor?: {
    id?: number;
    fullName?: string;
  };
  accessToken: string;
}
