export type IService = {
  bikeId: string;
  serviceDate: Date;
  completionDate?: Date | null;
  description: string;
  status: "pending" | "in-progress" | "done";
};
