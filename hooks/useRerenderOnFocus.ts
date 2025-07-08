import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export function useRerenderOnFocus(deps: any[] = []) {
  const [shouldRender, setShouldRender] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setShouldRender(false);
      const timer = setTimeout(() => setShouldRender(true), 0);

      return () => clearTimeout(timer);
    }, deps)
  );

  return shouldRender;
}
