export interface Config {
  companyName: string;
  logoUrl: string;
  fromEmail: string;
  contactEmail: string;
}

export const emailConfig: Config = {
  companyName: "Voltig Turbo",
  fromEmail: "noreply@turbo.voltig.dev",
  logoUrl: "https://turbo.voltig.dev/logo.png",
  contactEmail: "contact@voltig.dev",
  
};
