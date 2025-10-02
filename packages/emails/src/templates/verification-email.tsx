import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { emailConfig } from "../config";

type VerificationEmailProps = {
  name: string;
  verificationUrl: string;
};

export const VerificationEmail = ({
  name,
  verificationUrl,
}: VerificationEmailProps) => {
  return (
    <Html>
      <Head>
        <style>{`
          .verify-button:hover {
            background-color: #1d4ed8 !important;
          }
        `}</style>
      </Head>
      <Preview>Verify your email address for {emailConfig.companyName}</Preview>
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
                Verify your email address
              </Heading>
              <Text className="text-gray-600">
                Welcome to {emailConfig.companyName}! Please verify your email address to
                complete your account setup.
              </Text>
            </Section>

            <Section className="text-center mb-8">
              <Text className="text-lg mb-6">Hi {name},</Text>
              <Text className="text-gray-700 mb-6">
                Click the button below to verify your email address 
              </Text>

              <Button
                href={verificationUrl}
                className="verify-button bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg"
              >
                Verify Email Address
              </Button>

              <Text className="text-sm text-gray-500 mt-4">
                This link will expire in 24 hours for security reasons.
              </Text>
            </Section>

            <Section>
              <Text className="text-gray-700 mb-4">
                If the button doesn't work, you can copy and paste this link
                into your browser:
              </Text>
              <Text className="text-blue-600 text-sm break-all mb-4">
                {verificationUrl}
              </Text>

              <Text className="text-gray-700 mb-4">
                If you didn't create an account with {emailConfig.companyName}, you can
                safely ignore this email.
              </Text>

              <Text className="text-gray-700">
                For security reasons, please don't share this verification link
                with anyone.
              </Text>
            </Section>

            <Section className="mt-8 pt-6 border-t border-gray-200">
              <Text className="text-center text-gray-500 text-sm">
                © 2024 {emailConfig.companyName}. All rights reserved.
              </Text>
              <Text className="text-center text-gray-500 text-sm">
                Questions? Contact us at {emailConfig.contactEmail}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
