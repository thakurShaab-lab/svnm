"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Loader2, 
  Upload, 
  X, 
  ImageIcon, 
  Search, 
  Filter, 
  Package, 
  Wrench, 
  Save, 
  ChevronLeft, 
  ChevronRight,
  Layers,
  Trash2
} from "lucide-react";
import Image from "next/image";
import { slugify } from "@/lib/slugify";

type Item = {
  _id: string;
  slug?: string;
  name?: string;
  image?: string;
  imageUrl?: string;
  description?: string;
  features?: string[];
  summary?: string;
  category?: string;
  categoryInfo?: string;
  applications?: string[];
};

const ITEMS_PER_PAGE = 5;

export default function AdminItemsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Item[]>([]);
  const [services, setServices] = useState<Item[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Filters + Tabs
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [categoryFilter, setCategoryFilter] = useState(
    searchParams.get("category") || "all",
  );
  const [tab, setTab] = useState<"products" | "services">(
    (searchParams.get("tab") as "products" | "services") || "products",
  );
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  // Sync filters, tab & page to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (categoryFilter && categoryFilter !== "all")
      params.set("category", categoryFilter);
    if (tab) params.set("tab", tab);
    if (page > 1) params.set("page", page.toString());
    const queryString = params.toString();
    router.replace(`/admin/items${queryString ? `?${queryString}` : ""}`);
  }, [search, categoryFilter, tab, page, router]);

  // Fetch products & services
  const fetchData = async () => {
    try {
      const [productsRes, servicesRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/services"),
      ]);
      const productsData = await productsRes.json();
      const servicesData = await servicesRes.json();
      setProducts(productsData.products || []);
      setServices(servicesData.services || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Save handler - update local state immediately
  const handleSave = async (
    type: "product" | "service",
    id: string,
    draft: Item,
  ) => {
    setSavingId(id);
    try {
      const { _id, imageUrl, ...rest } = draft;
      const imageId =
        imageUrl?.match(/\/api\/images\/([a-f0-9]+)/)?.[1] || null;
      const payload = { ...rest, image: imageId };

      const res = await fetch(`/api/${type}s/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        const updatedItem = data[`${type}`] || payload;

        if (type === "product") {
          setProducts((prev) =>
            prev.map((p) =>
              p._id === id ? { ...p, ...updatedItem, imageUrl } : p,
            ),
          );
        } else {
          setServices((prev) =>
            prev.map((s) =>
              s._id === id ? { ...s, ...updatedItem, imageUrl } : s,
            ),
          );
        }

        alert(`${type} updated successfully!`);
      } else {
        console.error("Save failed", await res.text());
      }
    } catch (err) {
      console.error("Save error", err);
    } finally {
      setSavingId(null);
    }
  };

  // Delete handler - delete item and clean up local state
  const handleDelete = async (
    type: "product" | "service",
    id: string,
    name?: string,
  ) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${name || "this item"}"? This action cannot be undone.`
    );
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/${type}s/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        if (type === "product") {
          setProducts((prev) => prev.filter((p) => p._id !== id));
        } else {
          setServices((prev) => prev.filter((s) => s._id !== id));
        }
        alert(`${type} deleted successfully!`);
      } else {
        const errorData = await res.json();
        alert(`Failed to delete: ${errorData.error || errorData.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete item. Please check network connection.");
    } finally {
      setDeletingId(null);
    }
  };

  // Tab-dependent categories calculation (STRICT FILTER)
  const categories = useMemo(() => {
    const cats = new Set<string>();
    const activeList = tab === "products" ? products : services;
    
    activeList.forEach((item) => {
      if (item.category) {
        cats.add(item.category);
      }
    });

    return ["all", ...Array.from(cats)];
  }, [products, services, tab]);

  // Filter + pagination
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        categoryFilter === "all" || p.category === categoryFilter;
      const matchesSearch =
        search === "" ||
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.slug?.toLowerCase().includes(search.toLowerCase()) ||
        p.summary?.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, categoryFilter, search]);

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchesCategory =
        categoryFilter === "all" || s.category === categoryFilter;
      const matchesSearch =
        search === "" ||
        s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.slug?.toLowerCase().includes(search.toLowerCase()) ||
        s.summary?.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [services, categoryFilter, search]);

  const activeItems = tab === "products" ? filteredProducts : filteredServices;
  const totalPages = Math.ceil(activeItems.length / ITEMS_PER_PAGE);
  const paginatedItems = activeItems.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-80 space-y-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <span className="text-sm font-medium text-muted-foreground">
          Loading catalog items...
        </span>
      </div>
    );
  }

  // Render Item
  const RenderItem = ({
    type,
    item,
  }: {
    type: "product" | "service";
    item: Item;
  }) => {
    const [draft, setDraft] = useState<Item>({ ...item });
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (field: keyof Item, value: any) => {
      setDraft((prev) => ({
        ...prev,
        [field]: value,
        ...(field === "name" ? { slug: slugify(value) } : {}),
      }));
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      const previousImageUrl = draft.imageUrl;

      try {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("productId", item._id);

        const res = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error(await res.text());

        const data = await res.json();
        const newImageUrl = `/api/images/${data.imageId}`;
        handleChange("imageUrl", newImageUrl);

        const previousId = previousImageUrl?.match(
          /\/api\/images\/([a-f0-9]+)/,
        )?.[1];
        if (previousId) {
          fetch(`/api/images/${previousId}`, { method: "DELETE" }).catch(
            (err) => console.error("Failed to delete old image:", err),
          );
        }
      } catch (err) {
        console.error("Image upload failed:", err);
        alert("Image upload failed. Please try again.");
      } finally {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };

    const handleRemoveImage = async () => {
      if (!draft.imageUrl) return;
      if (!confirm("Remove this image?")) return;

      const imageId = draft.imageUrl?.match(/\/api\/images\/([a-f0-9]+)/)?.[1];
      handleChange("imageUrl", "");

      if (imageId) {
        try {
          await fetch(`/api/images/${imageId}`, { method: "DELETE" });
        } catch (err) {
          console.error("Failed to delete image from storage:", err);
        }
      }
    };

    return (
      <Card className="mb-6 shadow-sm overflow-hidden border border-muted" key={item._id}>
        <div className="bg-muted/40 px-6 py-3 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="uppercase font-mono text-[10px] bg-background">
              ID: {item._id.slice(-6)}
            </Badge>
            <span className="text-xs font-medium text-muted-foreground">
              {draft.slug || "no-slug"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="capitalize">
              {type}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Item Name</label>
              <Input
                value={draft.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="name"
                className="font-medium"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Category</label>
              <Input
                value={draft.category || ""}
                onChange={(e) => handleChange("category", e.target.value)}
                placeholder="category"
              />
            </div>
            {/* <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Slug (Auto-generated)</label>
              <Input
                value={draft.slug || ""}
                onChange={(e) => handleChange("slug", e.target.value)}
                placeholder="slug"
                className="font-mono text-xs bg-muted/20"
              />
            </div> */}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Summary</label>
              <Textarea
                value={draft.summary || ""}
                onChange={(e) => handleChange("summary", e.target.value)}
                placeholder="summary"
                rows={2}
              />
            </div>
            <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase">Category Details</label>
            <Textarea
              value={draft.categoryInfo || ""}
              onChange={(e) => handleChange("categoryInfo", e.target.value)}
              placeholder="categoryInfo"
              rows={2}
            />
          </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase">Detailed Description</label>
            <Textarea
              value={draft.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="description"
              rows={3}
            />
          </div>

          

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Features (Comma separated)</label>
              <Textarea
                value={Array.isArray(draft.features) ? draft.features.join(", ") : ""}
                onChange={(e) =>
                  handleChange(
                    "features",
                    e.target.value
                      .split(",")
                      .map((f) => f.trim())
                      .filter(Boolean),
                  )
                }
                placeholder="feature 1, feature 2"
                rows={3}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Applications (Comma separated)</label>
              <Textarea
                value={
                  Array.isArray(draft.applications)
                    ? draft.applications.join(", ")
                    : ""
                }
                onChange={(e) =>
                  handleChange(
                    "applications",
                    e.target.value
                      .split(",")
                      .map((a) => a.trim())
                      .filter(Boolean),
                  )
                }
                placeholder="application 1, application 2"
                rows={3}
              />
            </div>
          </div>

          {/* Image Section */}
          <div className="pt-2 border-t space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase block">
              Item Thumbnail Image
            </label>

            {draft.imageUrl ? (
              <div className="flex items-center gap-4 p-3 bg-muted/20 border rounded-lg">
                <div className="relative w-24 h-24 border rounded-md overflow-hidden bg-background shrink-0 shadow-sm">
                  <Image
                    src={draft.imageUrl}
                    alt={draft.name || "item image"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="h-8"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />{" "}
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-3.5 w-3.5 mr-1.5" /> Change Image
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    disabled={uploading || !draft.imageUrl}
                    onClick={handleRemoveImage}
                    className="h-8"
                  >
                    <X className="h-3.5 w-3.5 mr-1.5" /> Remove Image
                  </Button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-muted/30 transition-all"
              >
                {uploading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                ) : (
                  <>
                    <ImageIcon className="h-6 w-6 mb-1 text-muted-foreground" />
                    <span className="text-xs font-medium">Click to upload new image</span>
                  </>
                )}
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>

          <div className="pt-2 flex items-center justify-between border-t">
            {/* Delete Button */}
            <Button
              size="default"
              variant="destructive"
              onClick={() => handleDelete(type, item._id, item.name)}
              disabled={deletingId === item._id || savingId === item._id}
              className="flex items-center gap-2"
            >
              {deletingId === item._id ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Delete {type === "product" ? "Product" : "Service"}
                </>
              )}
            </Button>

            {/* Save Button */}
            <Button 
              size="default" 
              onClick={() => handleSave(type, item._id, draft)}
              disabled={savingId === item._id || deletingId === item._id}
              className="min-w-[160px] flex items-center gap-2"
            >
              {savingId === item._id ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save All Changes
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <main className="max-w-6xl mx-auto space-y-6">
      {/* Title & Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-background p-6 rounded-xl border shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Catalog Items</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Search, edit, update images, and delete products or services.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1 flex gap-1.5 items-center">
            <Layers className="h-3.5 w-3.5" />
            Total: {products.length + services.length} Items
          </Badge>
        </div>
      </div>

      {/* Search + Filter Header */}
      <Card className="shadow-sm">
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, slug, summary..."
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                className="pl-9"
              />
            </div>
            
            <div className="flex items-center gap-2 md:w-1/3">
              <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setPage(1);
                  setCategoryFilter(e.target.value);
                }}
                className="w-full bg-background border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 pt-2 border-t">
            <Button
              variant={tab === "products" ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                setTab("products");
                setCategoryFilter("all");
                setPage(1);
              }}
              className="flex items-center gap-2"
            >
              <Package className="h-4 w-4" />
              Products ({filteredProducts.length})
            </Button>
            <Button
              variant={tab === "services" ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                setTab("services");
                setCategoryFilter("all");
                setPage(1);
              }}
              className="flex items-center gap-2"
            >
              <Wrench className="h-4 w-4" />
              Services ({filteredServices.length})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Catalog List */}
      <div>
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item) => (
            <RenderItem
              key={item._id}
              type={tab === "products" ? "product" : "service"}
              item={item}
            />
          ))
        ) : (
          <Card className="p-12 text-center text-muted-foreground shadow-sm">
            No {tab} found matching your filter criteria.
          </Card>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t pt-4 px-2">
            <span className="text-xs text-muted-foreground">
              Showing page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="flex items-center gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}