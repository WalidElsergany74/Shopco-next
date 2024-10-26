import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface EmailTemplateProps {
  body: {
    fullName: string;
    productDetails :string
    amount : string
  };
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ body }) => (
  <Html>
    <Head />
    <Preview>
      The Ecommerce Platform For Your Digital Products - Search Now for Your Future
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://res.cloudinary.com/dmjmejad7/image/upload/v1729807212/Rectangle_2_6d6f8d2880.png"
          width="420"
          height="300"
          alt="Koala"
          style={logo}
        />
        <Text style={paragraph}>Hi {body.fullName},</Text>
        <Text style={paragraph}>
          Thank you for purchasing on ShopCo Ecommerce.
        </Text>
        <Text style={paragraph}>
         {body.productDetails} 
        </Text>
        <Text style={paragraph}>
         Total :   {body.amount} $
        </Text>
        <Text style={paragraph}>
          Best,
          <br />
          ShopCo Team.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Subscribe to ShopCo.</Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const logo = {
  margin: '0 auto',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
};

export default EmailTemplate;
