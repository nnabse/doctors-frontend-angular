export interface Reception {
  id: number;
  patientName: string;
  date: string;
  complaints: string;
  doctor?: {
    id?: number;
    fullName?: string;
  };
  accessToken: string;
}
