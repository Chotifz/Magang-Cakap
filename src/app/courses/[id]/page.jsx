import BannerPage from "@/components/fragments/banner-page";
import AboutCourseTemplate from "@/components/template/about-course-template";
import CourseTemplate from "@/components/template/course-template";

import { fetchDetail, fetchSummary, fetchHighlightedCourses } from "@/lib/api";

export default async function DetailList() {
  const courseDetail = await fetchDetail(815, "WEB");
  const { courseName, categoriesName, icon } = courseDetail.data;

  const summary = await fetchSummary();
  const { totalReviewer, avgRating } = summary.data;

  const courseHighlight = await fetchHighlightedCourses();

  return (
    <div className="text-white">
      <BannerPage>
        <div className="w-1/2 flex justify-center">
          <img src={icon.thumbnail} alt={courseName} width="500px" />
        </div>
        <div className="w-1/2 flex items-center">
          <div className="flex flex-col justify-between gap-8">
            <h1 className="text-2xl font-bold">{categoriesName}</h1>
            <h2 className="text-sm">
              {courseName.replace(/\[ENGLISH\]/i, "").trim()}
            </h2>
            <div className="flex items-center gap-2 text-yellow-300">
              <p className="text-lg font-bold">
                {avgRating.toFixed(2)}{" "}
                <span className="text-sm font-bold">{`(${totalReviewer} Ulasan)`}</span>
              </p>
            </div>
          </div>
        </div>
      </BannerPage>
      <AboutCourseTemplate />
      <CourseTemplate courses={courseHighlight.data} title={"Kursus Terkait"} />
    </div>
  );
}
