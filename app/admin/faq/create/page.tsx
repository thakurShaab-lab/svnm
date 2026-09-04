"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface FaqFormData {
  question: string;
  answer: string;
  status: "active" | "inactive";
  order: number | "";
}

interface OptionItem {
  _id: string;
  slug: string;
  name: string;
}

export default function AddFaqPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<FaqFormData>({
    question: "",
    answer: "",
    status: "active",
    order: "",
  });

  const [associationType, setAssociationType] = useState<"product" | "service">("product");
  const [products, setProducts] = useState<OptionItem[]>([]);
  const [services, setServices] = useState<OptionItem[]>([]);
  const [productSlug, setProductSlug] = useState("");
  const [serviceSlug, setServiceSlug] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [productsRes, servicesRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/services"),
        ]);
        const productsData = await productsRes.json();
        const servicesData = await servicesRes.json();

        if (productsData.success) setProducts(productsData.products || []);
        if (servicesData.success) setServices(servicesData.services || []);
      } catch (error) {
        console.error("Failed to load products/services:", error);
      }
    };

    fetchOptions();
  }, []);

  const selectedAssociationSlug =
    associationType === "product" ? productSlug : serviceSlug;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Processing...");

    try {
      const payload = {
        ...formData,
        order: formData.order === "" ? undefined : Number(formData.order),
        productSlug: associationType === "product" ? productSlug : undefined,
        serviceSlug: associationType === "service" ? serviceSlug : undefined,
      };

      const response = await fetch("/api/admin/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("FAQ added successfully!");
        setTimeout(() => router.push("/admin/faq"), 800);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Failed to add FAQ: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="flex items-center gap-3 bg-background p-6 rounded-xl border shadow-sm">
        <div className="p-3 bg-rose-500/10 text-rose-600 rounded-lg">
          <HelpCircle className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New FAQ</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Add a new question to the public FAQ page.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">FAQ Details</CardTitle>
            <CardDescription>Question, answer, status, and order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase font-medium">Associate With *</Label>
              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="associationType"
                    value="product"
                    checked={associationType === "product"}
                    onChange={() => setAssociationType("product")}
                    className="h-4 w-4"
                  />
                  Product
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="associationType"
                    value="service"
                    checked={associationType === "service"}
                    onChange={() => setAssociationType("service")}
                    className="h-4 w-4"
                  />
                  Service
                </label>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="productSlug" className="text-xs uppercase font-medium">Product</Label>
                <select
                  id="productSlug"
                  value={productSlug}
                  onChange={(e) => setProductSlug(e.target.value)}
                  disabled={associationType !== "product"}
                  className="w-full bg-background border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select a product...</option>
                  {products.map((p) => (
                    <option key={p._id} value={p.slug}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="serviceSlug" className="text-xs uppercase font-medium">Service</Label>
                <select
                  id="serviceSlug"
                  value={serviceSlug}
                  onChange={(e) => setServiceSlug(e.target.value)}
                  disabled={associationType !== "service"}
                  className="w-full bg-background border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select a service...</option>
                  {services.map((s) => (
                    <option key={s._id} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="status" className="text-xs uppercase font-medium">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value as "active" | "inactive",
                    }))
                  }
                  className="w-full bg-background border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="order" className="text-xs uppercase font-medium">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      order: e.target.value === "" ? "" : Number(e.target.value),
                    }))
                  }
                  placeholder="Auto (last)"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="question" className="text-xs uppercase font-medium">Question *</Label>
              <Textarea
                id="question"
                value={formData.question}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, question: e.target.value }))
                }
                placeholder="e.g. What calibration standards do you follow?"
                rows={2}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="answer" className="text-xs uppercase font-medium">Answer *</Label>
              <Textarea
                id="answer"
                value={formData.answer}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, answer: e.target.value }))
                }
                placeholder="Write the answer..."
                rows={5}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Action */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={
              loading ||
              !formData.question.trim() ||
              !formData.answer.trim() ||
              !selectedAssociationSlug
            }
            className="w-full font-medium"
            size="lg"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Adding FAQ...
              </span>
            ) : (
              "Add FAQ"
            )}
          </Button>
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg border text-sm flex items-center gap-2 ${message.includes("Error") || message.includes("Failed")
                ? "bg-destructive/10 border-destructive/20 text-destructive"
                : "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300"
              }`}
          >
            {message.includes("Error") || message.includes("Failed") ? (
              <AlertCircle className="h-4 w-4 shrink-0" />
            ) : (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            )}
            <span>{message}</span>
          </div>
        )}
      </form>
    </main>
  );
}
