import { useState } from "react";
export const useItems = (initItems: any[]) => {
  const [items, setItems] = useState<any[]>(initItems);
};
