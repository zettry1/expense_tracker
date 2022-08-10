export default interface Expense {
  _id: string;
  name: string;
  type: string;
  description: string;
  total: number;
  date: string;
  category?: {
    categ_id: string;
    name: string;
  };
}
