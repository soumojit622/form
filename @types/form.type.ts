import { Form, FormSettings } from "@prisma/client";

export type FormWithSettings = Form & { settings: FormSettings };