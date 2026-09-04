"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Wrench, Upload, Plus, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { slugify } from "@/lib/slugify";

interface ServiceData {
  slug: string;
  name: string;
  image: string;
  description: string;
  features: string[];
  summary: string;
  category: string;
  categoryInfo: string;
  applications: string[];
}

export default function AddServicePage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageId, setImageId] = useState("");
  const [serviceData, setServiceData] = useState<ServiceData>({
    slug: "",
    name: "",
    image: "",
    description: "",
    features: [],
    summary: "",
    category: "",
    categoryInfo: "",
    applications: [],
  });
  const [newFeature, setNewFeature] = useState("");
  const [newApplication, setNewApplication] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setImageFile(selectedFile);
      setMessage("");
    } else {
      setMessage("Please select a valid image file");
      setImageFile(null);
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) {
      throw new Error("No image file selected");
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || "Failed to upload image");
    }

    return data.imageId;
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setServiceData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setServiceData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addApplication = () => {
    if (newApplication.trim()) {
      setServiceData((prev) => ({
        ...prev,
        applications: [...prev.applications, newApplication.trim()],
      }));
      setNewApplication("");
    }
  };

  const removeApplication = (index: number) => {
    setServiceData((prev) => ({
      ...prev,
      applications: prev.applications.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Processing...");

    try {
      let finalImageId = serviceData.image;
      if (imageFile) {
        finalImageId = await uploadImage();
      }

      const serviceToSubmit = {
        ...serviceData,
        image: finalImageId,
        features: serviceData.features.length > 0 ? serviceData.features : [],
        applications:
          serviceData.applications.length > 0 ? serviceData.applications : [],
        description: serviceData.description.trim() || "",
        categoryInfo: serviceData.categoryInfo.trim() || "",
      };

      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceToSubmit),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`Service "${serviceData.name}" added successfully!`);
        setServiceData({
          slug: "",
          name: "",
          image: "",
          description: "",
          features: [],
          summary: "",
          category: "",
          categoryInfo: "",
          applications: [],
        });
        setImageFile(null);
        setImageId("");
        const fileInput = document.getElementById(
          "image-input",
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Failed to add service: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="flex items-center gap-3 bg-background p-6 rounded-xl border shadow-sm">
        <div className="p-3 bg-purple-500/10 text-purple-600 rounded-lg">
          <Wrench className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Service</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Create a new service offering or technical support capability.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Basic Information */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Basic Information</CardTitle>
              <CardDescription>Primary service details & summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="slug" className="text-xs uppercase font-medium">Auto Slug *</Label>
                <Input
                  id="slug"
                  value={serviceData.slug}
                  readOnly
                  placeholder="auto-generated-slug"
                  className="bg-muted/40 cursor-not-allowed font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs uppercase font-medium">Service Name *</Label>
                <Input
                  id="name"
                  value={serviceData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setServiceData((prev) => ({
                      ...prev,
                      name,
                      slug: slugify(name),
                    }));
                  }}
                  placeholder="e.g. Surface Calibration & Maintenance"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="category" className="text-xs uppercase font-medium">Category *</Label>
                <Input
                  id="category"
                  value={serviceData.category}
                  onChange={(e) =>
                    setServiceData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  placeholder="e.g. Metrology Calibration"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="summary" className="text-xs uppercase font-medium">Summary *</Label>
                <Textarea
                  id="summary"
                  value={serviceData.summary}
                  onChange={(e) =>
                    setServiceData((prev) => ({
                      ...prev,
                      summary: e.target.value,
                    }))
                  }
                  placeholder="Brief summary of service scope..."
                  rows={2}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Service Image</CardTitle>
              <CardDescription>Upload photo or link database ID</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="image-input" className="text-xs uppercase font-medium">Upload File</Label>
                <Input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                {imageFile && (
                  <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Selected: {imageFile.name}
                  </p>
                )}
              </div>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-background px-2 text-muted-foreground">Or</span></div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="image-id" className="text-xs uppercase font-medium">Existing Image ID</Label>
                <Input
                  id="image-id"
                  type="text"
                  value={imageId}
                  onChange={(e) => {
                    setImageId(e.target.value);
                    setServiceData((prev) => ({
                      ...prev,
                      image: e.target.value,
                    }));
                  }}
                  placeholder="507f1f77bcf86cd799439011"
                  className="font-mono text-xs"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Description & Category Details */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Detailed Description</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={serviceData.description}
                onChange={(e) =>
                  setServiceData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Comprehensive technical specifications and scope..."
                rows={4}
              />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Category Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={serviceData.categoryInfo}
                onChange={(e) =>
                  setServiceData((prev) => ({
                    ...prev,
                    categoryInfo: e.target.value,
                  }))
                }
                placeholder="Information regarding this service division..."
                rows={4}
              />
            </CardContent>
          </Card>
        </div>

        {/* Features & Applications */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Features */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Service Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a service feature..."
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addFeature())
                  }
                />
                <Button
                  type="button"
                  onClick={addFeature}
                  disabled={!newFeature.trim()}
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-1.5 min-h-[40px] p-2 border rounded-md bg-muted/20">
                {serviceData.features.map((feature, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1.5 text-xs py-1 px-2.5"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="hover:text-destructive transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Applications */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Applications & Industries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newApplication}
                  onChange={(e) => setNewApplication(e.target.value)}
                  placeholder="Add target industry or use case..."
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addApplication())
                  }
                />
                <Button
                  type="button"
                  onClick={addApplication}
                  disabled={!newApplication.trim()}
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-1.5 min-h-[40px] p-2 border rounded-md bg-muted/20">
                {serviceData.applications.map((application, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="flex items-center gap-1.5 text-xs py-1 px-2.5 bg-background"
                  >
                    {application}
                    <button
                      type="button"
                      onClick={() => removeApplication(index)}
                      className="hover:text-destructive transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submit Action */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading || !serviceData.slug || !serviceData.name}
            className="w-full font-medium"
            size="lg"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Adding Service...
              </span>
            ) : (
              "Add Service to Database"
            )}
          </Button>
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg border text-sm flex items-center gap-2 ${
              message.includes("Error") || message.includes("Failed")
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