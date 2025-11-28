type OrganizationSchema = {
  "@context": string;
  "@type": string;
  name: string;
  description?: string;
  url?: string;
  logo?: string;
  contactPoint?: {
    "@type": string;
    telephone?: string;
    email?: string;
    contactType: string;
  };
  address?: {
    "@type": string;
    addressCountry?: string;
    addressLocality?: string;
  };
};

type ServiceSchema = {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  provider: {
    "@type": string;
    name: string;
  };
  areaServed?: string;
};

type ProductSchema = {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  manufacturer: {
    "@type": string;
    name: string;
  };
};

type BreadcrumbSchema = {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    item?: string;
  }>;
};

type JsonLdProps = {
  data: OrganizationSchema | ServiceSchema | ProductSchema | BreadcrumbSchema;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Helper functions to generate common schemas

export function generateOrganizationSchema(lang: string): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Eureka Automation",
    description:
      lang === "en"
        ? "Industrial Automation Solutions Provider in Thailand"
        : "ผู้ให้บริการโซลูชันระบบอัตโนมัติอุตสาหกรรมในประเทศไทย",
    url: `https://eureka-automation.com/${lang}`,
    logo: "https://eureka-automation.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+66-XX-XXX-XXXX",
      email: "info@eureka-automation.com",
      contactType: "customer service",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "TH",
      addressLocality: "Bangkok",
    },
  };
}

export function generateServiceSchema(
  name: string,
  description: string,
  lang: string
): ServiceSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: "Eureka Automation",
    },
    areaServed: "Thailand",
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
