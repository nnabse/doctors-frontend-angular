export interface Reception {
  id: any;
  patientName: string;
  date: string;
  complaints: string;
  DoctorId: number;
  Doctor?: {
    id?: number;
    fullname?: string;
  };
  accessToken: string;
}
