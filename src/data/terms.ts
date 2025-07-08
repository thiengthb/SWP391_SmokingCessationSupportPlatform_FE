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
    titleKey: "terms.1.title",
    descriptionKey: "terms.1.description",
    itemKeys: [
      "terms.1.items.0",
      "terms.1.items.1",
      "terms.1.items.2",
      "terms.1.items.3",
      "terms.1.items.4",
    ],
    noteKey: "terms.1.note",
    icon: FileText,
  },
  {
    id: 2,
    titleKey: "terms.2.title",
    descriptionKey: "terms.2.description",
    icon: AlertTriangle,
    type: "warning",
  },
  {
    id: 3,
    titleKey: "terms.3.title",
    descriptionKey: "terms.3.description",
    icon: Phone,
    type: "danger",
  },
  {
    id: 4,
    titleKey: "terms.4.title",
    itemKeys: [
      "terms.4.items.0",
      "terms.4.items.1",
      "terms.4.items.2",
      "terms.4.items.3",
    ],
    icon: Users,
  },
  {
    id: 5,
    titleKey: "terms.5.title",
    descriptionKey: "terms.5.description",
    icon: Shield,
    type: "info",
  },
  {
    id: 6,
    titleKey: "terms.6.title",
    descriptionKey: "terms.6.description",
    icon: Scale,
  },
  {
    id: 7,
    titleKey: "terms.7.title",
    descriptionKey: "terms.7.description",
    icon: Settings,
  },
  {
    id: 8,
    titleKey: "terms.8.title",
    descriptionKey: "terms.8.description",
    icon: AlertTriangle,
  },
  {
    id: 9,
    titleKey: "terms.9.title",
    descriptionKey: "terms.9.description",
    itemKeys: [
      "terms.9.items.0",
      "terms.9.items.1",
      "terms.9.items.2",
    ],
    icon: UserX,
  },
  {
    id: 10,
    titleKey: "terms.10.title",
    descriptionKey: "terms.10.description",
    icon: Scale,
  },
];
