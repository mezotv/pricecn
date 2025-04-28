export interface Product {
  name: string;
  description?: string;

  price: {
    primaryText: string;
    secondaryText?: string;
  };

  everythingFrom?: string;
  buttonText?: string;
  recommendText?: string;

  items: {
    primaryText: string;
    secondaryText?: string;
  }[];

  // Pricing card actions
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const products: Product[] = [
  {
    name: "Hobby",
    description: "For personal projects and small-scale applications.",
    price: { primaryText: "Free", secondaryText: "up to 3 users" },
    buttonText: "Start deploying",
    items: [
      {
        primaryText: "Deploy full-stack apps in minutes",
      },
      {
        primaryText: "Fully-managed datastores",
      },
      {
        primaryText: "Custom domains",
      },
      {
        primaryText: "Global CDN & regional hosting",
      },
      {
        primaryText: "Get security out of the box",
      },
      {
        primaryText: "Email support",
      },
    ],
  },
  {
    name: "Professional",
    description: "For teams building production applications.",
    price: {
      primaryText: "$19",
      secondaryText: "per user/month plus compute costs*",
    },
    buttonText: "Select plan",
    everythingFrom: "Hobby",
    items: [
      {
        primaryText: "10 team members included",
        secondaryText: "Then $20 per member",
      },
      {
        primaryText: "500 GB of bandwidth included",
      },
      {
        primaryText: "Unlimited projects & environments",
      },
      {
        primaryText: "Horizontal autoscaling",
      },
      {
        primaryText: "Test with preview environments",
      },
      {
        primaryText: "Isolated environments",
      },
    ],
  },
  {
    name: "Organization",
    description: "For teams with higher traffic demands and compliance needs.",
    price: {
      primaryText: "$29",
      secondaryText: "per user/month plus compute costs*",
    },

    recommendText: "Best Value",
    buttonText: "Select plan",
    everythingFrom: "Professional",
    items: [
      {
        primaryText: "1 TB of bandwidth included",
        secondaryText: "Then $0.10/GB",
      },
      {
        primaryText: "Unlimited team members",
      },
      {
        primaryText: "Audit logs",
      },
      {
        primaryText: "SOC 2 Type II certificate",
      },
      {
        primaryText: "ISO 27001 certificate",
      },
    ],
  },
  {
    name: "Enterprise",
    description: "For mission critical applications with complex needs.",
    price: { primaryText: "Custom" },
    buttonText: "Get in touch",
    everythingFrom: "Organization",
    items: [
      {
        primaryText: "Centralized team management",
      },
      {
        primaryText: "Guest users",
      },
      {
        primaryText: "SAML SSO & SCIM",
      },
      {
        primaryText: "Guaranteed uptime",
      },
      {
        primaryText: "Premium support",
      },
      {
        primaryText: "Customer success",
      },
    ],
  },
];
