"use client";

import { Checkbox } from "@tendtoyj/cds-ui/components/checkbox";
import {
  FormControl,
  FormDescription,
  FormErrorMessage,
  FormField,
  FormLabel,
} from "@tendtoyj/cds-ui/components/form";
import { Input } from "@tendtoyj/cds-ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@tendtoyj/cds-ui/components/select";
import * as React from "react";

export function FormInputDemo() {
  const [email, setEmail] = React.useState("");
  const invalid = email.length > 0 && !email.includes("@");
  return (
    <div className="cds-demo-row" style={{ maxWidth: 360 }}>
      <FormField>
        <FormLabel required>이메일</FormLabel>
        <FormControl>
          <Input
            type="email"
            size="md"
            placeholder="you@codexy.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            invalid={invalid}
            width="100%"
          />
        </FormControl>
        <FormDescription>회사 도메인이 아니어도 됩니다.</FormDescription>
        <FormErrorMessage>{invalid ? "올바른 이메일 형식이 아닙니다." : null}</FormErrorMessage>
      </FormField>
      <Styles />
    </div>
  );
}

export function FormSelectDemo() {
  return (
    <div className="cds-demo-row" style={{ maxWidth: 360 }}>
      <FormField>
        <FormLabel>팀</FormLabel>
        <FormControl>
          <Select defaultValue="design">
            <SelectTrigger size="md" style={{ width: "100%" }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="eng">Engineering</SelectItem>
              <SelectItem value="ops">Ops</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
        <FormDescription>초대 시 기본 소속으로 설정됩니다.</FormDescription>
      </FormField>
      <Styles />
    </div>
  );
}

export function FormCheckboxDemo() {
  return (
    <div className="cds-demo-row">
      <FormField orientation="inline">
        <FormControl>
          <Checkbox />
        </FormControl>
        <FormLabel>이용약관에 동의합니다.</FormLabel>
        <FormDescription>필수 항목입니다.</FormDescription>
      </FormField>
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .cds-demo-row {
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--cds-line-solid-normal);
        border-radius: var(--cds-radius-lg);
        background: var(--cds-background-normal-normal);
      }
    `}</style>
  );
}
