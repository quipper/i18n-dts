export interface Config {
  model: string;
  outputDir: string;
}

export interface Translation {
  key: string;
  interpolations: string[];
}

export interface JsonObject {
  [key: string]: any;
}
