import {
  FileText,
  AlertTriangle,
  Phone,
  Users,
  Shield,
  Scale,
  Settings,
  UserX,
} from "lucide-react";

export interface TermSection {
  id: number;
  titleKey: string;
  descriptionKey?: string;
  itemKeys?: string[];
  noteKey?: string;
  icon: React.ElementType;
  type?: "warning" | "danger" | "info";
}

export const termsSections: TermSection[] = [
  {
    id: 1,
    titleKey: "data.terms.1.title",
    descriptionKey: "data.terms.1.description",
    itemKeys: [
      "data.terms.1.items.0",
      "data.terms.1.items.1",
      "data.terms.1.items.2",
      "data.terms.1.items.3",
      "data.terms.1.items.4",
    ],
    noteKey: "data.terms.1.note",
    icon: FileText,
  },
  {
    id: 2,
    titleKey: "data.terms.2.title",
    descriptionKey: "data.terms.2.description",
    icon: AlertTriangle,
    type: "warning",
  },
  {
    id: 3,
    titleKey: "data.terms.3.title",
    descriptionKey: "data.terms.3.description",
    icon: Phone,
    type: "danger",
  },
  {
    id: 4,
    titleKey: "data.terms.4.title",
    itemKeys: [
      "data.terms.4.items.0",
      "data.terms.4.items.1",
      "data.terms.4.items.2",
      "data.terms.4.items.3",
    ],
    icon: Users,
  },
  {
    id: 5,
    titleKey: "data.terms.5.title",
    descriptionKey: "data.terms.5.description",
    icon: Shield,
    type: "info",
  },
  {
    id: 6,
    titleKey: "data.terms.6.title",
    descriptionKey: "data.terms.6.description",
    icon: Scale,
  },
  {
    id: 7,
    titleKey: "data.terms.7.title",
    descriptionKey: "data.terms.7.description",
    icon: Settings,
  },
  {
    id: 8,
    titleKey: "data.terms.8.title",
    descriptionKey: "data.terms.8.description",
    icon: AlertTriangle,
  },
  {
    id: 9,
    titleKey: "data.terms.9.title",
    descriptionKey: "data.terms.9.description",
    itemKeys: [
      "data.terms.9.items.0",
      "data.terms.9.items.1",
      "data.terms.9.items.2",
    ],
    icon: UserX,
  },
  {
    id: 10,
    titleKey: "data.terms.10.title",
    descriptionKey: "data.terms.10.description",
    icon: Scale,
  },
];
