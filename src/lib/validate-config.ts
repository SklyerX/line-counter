import { z } from "zod";

export const ConfigValidator = z.object({
  "exclude-empty-lines": z.boolean(),
  verbose: z.boolean(),
  validation: z.object({
    ignore_folders: z.string().array(),
    ignore_files: z.string().array(),
    ignore_extensions: z.string().array(),
  }),
});
