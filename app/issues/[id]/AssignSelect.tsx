"use client"
import { Select } from "@radix-ui/themes";
import React from "react";

const AssignSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign"/>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="1">Yous1</Select.Item>
            <Select.Item value="2">Yous2</Select.Item>
            <Select.Item value="3">Yous3</Select.Item>
          </Select.Group>
        </Select.Content>
      
    </Select.Root>
  );
};

export default AssignSelect;
