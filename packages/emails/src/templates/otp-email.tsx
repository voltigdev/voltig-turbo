import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { emailConfig } from "../config";

export type OTPEmailProps = {
  name: string;
  otp?: string;
  type?: "email-verification" | "password-reset";
  customTitle?: string;
  customMessage?: string;
  expiryMinutes?: number;
};

export const OTPEmail = ({
  name,
  otp,
  type = "email-verification",
  customTitle,
  customMessage,
  expiryMinutes = 5,
}: OTPEmailProps) => {
  // Dynamic content based on type
  const getTitle = () => {
    if (customTitle) return customTitle;
    return type === "password-reset"
      ? "Reset your password"
      : "Verify your email address";
  };

  const getMessage = () => {
    if (customMessage) return customMessage;
    return type === "password-reset"
      ? `Hi ${name}! Please use the verification code below to reset your password.`
      : `Thanks for signing up ${name}! Please use the verification code below to complete your registration.`;
  };

  const getPreviewText = () => {
    return type === "password-reset"
      ? `Reset your password for ${emailConfig.companyName}`
      : `Verify your email address for ${emailConfig.companyName}`;
  };

  return (
    <Html>
      <Head />
      <Preview>{getPreviewText()}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 py-12 font-sans">
          <Container className="mx-auto bg-white p-6 shadow-lg rounded-lg max-w-xl">
            <Section className="text-center mb-8">
              <Img
                src={emailConfig.logoUrl}
                alt={emailConfig.companyName}
                width="150"
                height="50"
                className="mx-auto mb-4"
              />
              <Heading className="text-2xl font-bold text-gray-800 mb-2">
                {getTitle()}
              </Heading>
              <Text className="text-gray-600">{getMessage()}</Text>
            </Section>

            <Section className="text-center mb-8">
              <Container className="bg-gray-50 py-6 px-4 rounded-lg">
                <Text className="text-4xl font-mono font-bold tracking-widest text-primary-600 my-0">
                  {otp}
                </Text>
              </Container>
              <Text className="text-sm text-gray-500 mt-4">
                This code will expire in {expiryMinutes} minutes
              </Text>
            </Section>

            <Section>
              <Text className="text-gray-700 mb-4">
                {type === "password-reset"
                  ? "If you didn't request a password reset, you can safely ignore this email."
                  : "If you didn't request this verification code, you can safely ignore this email."}
              </Text>
              <Text className="text-gray-700">
                For security reasons, please don't share this code with anyone.
              </Text>
              {type === "password-reset" && (
                <Text className="text-gray-700 mt-4">
                  If you continue to receive these emails, please contact our
                  support team.
                </Text>
              )}
            </Section>

            <Hr className="border-gray-200 my-8" />

            <Section className="text-center">
              <Text className="text-xs text-gray-500">
                © {new Date().getFullYear()} {emailConfig.companyName}. All rights
                reserved.
              </Text>
              <Text className="text-xs text-gray-500">
                If you have any questions, please contact our support team at{" "}
                <Link
                  href={`mailto:${emailConfig.contactEmail}`}
                  className="text-primary-600"
                >
                  {emailConfig.contactEmail}
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default OTPEmail;
