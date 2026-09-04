"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Search,
  HelpCircle,
  PlusCircle,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react";

type FaqItem = {
  _id: string;
  question?: string;
  answer?: string;
  status?: "active" | "inactive";
  order?: number;
};

const ITEMS_PER_PAGE = 8;

export default function AdminFaqListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || "all"
  );
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (page > 1) params.set("page", page.toString());
    const queryString = params.toString();
    router.replace(`/admin/faq${queryString ? `?${queryString}` : ""}`);
  }, [search, statusFilter, page, router]);

  const fetchFaqs = async () => {
    try {
      const res = await fetch("/api/admin/faq");
      const data = await res.json();
      setFaqs(data.faqs || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((f) => {
      const matchesStatus = statusFilter === "all" || f.status === statusFilter;
      const matchesSearch =
        search === "" || f.question?.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [faqs, statusFilter, search]);

  const totalPages = Math.ceil(filteredFaqs.length / ITEMS_PER_PAGE);
  const paginatedFaqs = filteredFaqs.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleToggleActive = async (faq: FaqItem) => {
    const nextStatus = faq.status === "active" ? "inactive" : "active";
    setBusyId(faq._id);
    try {
      const res = await fetch(`/api/admin/faq/${faq._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        setFaqs((prev) =>
          prev.map((f) => (f._id === faq._id ? { ...f, status: nextStatus } : f))
        );
        alert(`FAQ ${nextStatus === "active" ? "activated" : "deactivated"} successfully!`);
      } else {
        const errorData = await res.json();
        alert(`Failed to update status: ${errorData.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Status update error:", err);
      alert("Failed to update status. Please check network connection.");
    } finally {
      setBusyId(null);
    }
  };

  const handleOrderChange = async (faq: FaqItem, newOrder: number) => {
    setFaqs((prev) =>
      prev.map((f) => (f._id === faq._id ? { ...f, order: newOrder } : f))
    );
  };

  const handleOrderSave = async (faq: FaqItem) => {
    setBusyId(faq._id);
    try {
      const res = await fetch(`/api/admin/faq/${faq._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: faq.order }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Failed to update order: ${errorData.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Order update error:", err);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (faq: FaqItem) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this FAQ? This action cannot be undone.`
    );
    if (!confirmDelete) return;

    setBusyId(faq._id);
    try {
      const res = await fetch(`/api/admin/faq/${faq._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setFaqs((prev) => prev.filter((f) => f._id !== faq._id));
        alert("FAQ deleted successfully!");
      } else {
        const errorData = await res.json();
        alert(`Failed to delete: ${errorData.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete FAQ. Please check network connection.");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-80 space-y-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <span className="text-sm font-medium text-muted-foreground">
          Loading FAQs...
        </span>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto space-y-6">
      {/* Title & Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-background p-6 rounded-xl border shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage FAQ</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Create, edit, reorder, and delete frequently asked questions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1 flex gap-1.5 items-center">
            <HelpCircle className="h-3.5 w-3.5" />
            Total: {faqs.length} FAQs
          </Badge>
          <Button asChild className="flex items-center gap-2">
            <Link href="/admin/faq/create">
              <PlusCircle className="h-4 w-4" />
              Add New FAQ
            </Link>
          </Button>
        </div>
      </div>

      {/* Search + Filters */}
      <Card className="shadow-sm">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by question..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="pl-9"
            />
          </div>

          <div className="flex items-center gap-2 md:w-1/4">
            <select
              value={statusFilter}
              onChange={(e) => {
                setPage(1);
                setStatusFilter(e.target.value);
              }}
              className="w-full bg-background border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* List */}
      {paginatedFaqs.length > 0 ? (
        <Card className="shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 border-b">
                <tr className="text-left text-xs uppercase text-muted-foreground">
                  <th className="px-4 py-3 font-semibold">Order</th>
                  <th className="px-4 py-3 font-semibold">Question</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedFaqs.map((faq) => (
                  <tr key={faq._id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3 w-20">
                      <Input
                        type="number"
                        value={faq.order ?? 0}
                        onChange={(e) =>
                          handleOrderChange(faq, Number(e.target.value))
                        }
                        onBlur={() => handleOrderSave(faq)}
                        className="h-8 w-16 text-xs"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground line-clamp-2">
                        {faq.question}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={faq.status === "active" ? "default" : "secondary"}>
                        {faq.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={busyId === faq._id}
                          onClick={() => handleToggleActive(faq)}
                          title={faq.status === "active" ? "Deactivate" : "Activate"}
                        >
                          {faq.status === "active" ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/admin/faq/${faq._id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          disabled={busyId === faq._id}
                          onClick={() => handleDelete(faq)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card className="p-12 text-center text-muted-foreground shadow-sm">
          No FAQs found matching your filter criteria.
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
    </main>
  );
}
