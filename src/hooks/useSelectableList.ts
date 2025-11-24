import { useState } from "react";

export function useSelectableList<T extends { id: string }>() {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);

  const toggleItem = (item: T, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, item]);
    } else {
      setSelectedItems(prev => prev.filter(el => el.id !== item.id));
    }
  };

  const isSelected = (id: string) => {
    return selectedItems.some(item => item.id === id);
  };

  return {
    selectedItems,
    toggleItem,
    isSelected,
  };
}
